import { db } from '../firebase';
import { doc, getDoc, setDoc, getDocs, collection, arrayUnion } from 'firebase/firestore';
import { initialCategories, initialProducts } from '../data/defaultCatalog';
import { cleanFirestoreData } from './utils';

let isSeeding = false;

export async function ensureDefaultCatalogSeeded() {
  if (isSeeding) return;
  isSeeding = true;

  try {
    const setupDocRef = doc(db, 'configuracoes', 'app_setup');
    const setupSnap = await getDoc(setupDocRef);
    const setupData = setupSnap.exists() ? setupSnap.data() : null;

    // Checar se já existem dados no Firestore
    const catSnap = await getDocs(collection(db, 'categorias'));
    const prodSnap = await getDocs(collection(db, 'produtos'));

    // Se já existem produtos cadastrados, garantir que nenhum produto inicial tenha ficado com imagem quebrada/vazia
    if (prodSnap.docs.length > 0) {
      for (const pDoc of prodSnap.docs) {
        const pData = pDoc.data();
        const initialMatch = initialProducts.find(
          ip => ip.id === pDoc.id || ip.title.trim().toLowerCase() === (pData.title || '').trim().toLowerCase()
        );
        if (initialMatch && initialMatch.image) {
          // Se a imagem no Firestore for link externo do imgbb ou vazia
          if (!pData.image || typeof pData.image !== 'string' || pData.image.includes('ibb.co') || pData.image.includes('service unavailable')) {
            await setDoc(doc(db, 'produtos', pDoc.id), { image: initialMatch.image }, { merge: true });
          }
        }
      }

      if (setupData?.seeded) {
        return;
      }

      await setDoc(setupDocRef, {
        seeded: true,
        seededAt: setupData?.seededAt || new Date().toISOString()
      }, { merge: true });
      return;
    }

    if (setupData?.seeded) {
      return;
    }

    // Apenas para banco totalmente zerado/novo: gravar catálogo inicial uma única vez
    for (const cat of initialCategories) {
      await setDoc(doc(db, 'categorias', cat.id), cleanFirestoreData(cat), { merge: true });
    }

    for (const prod of initialProducts) {
      await setDoc(doc(db, 'produtos', prod.id), cleanFirestoreData(prod), { merge: true });
    }

    // Marcar como semeado com sucesso
    await setDoc(setupDocRef, {
      seeded: true,
      seededAt: new Date().toISOString()
    }, { merge: true });

  } catch (err) {
    console.warn('ensureDefaultCatalogSeeded error:', err);
  } finally {
    isSeeding = false;
  }
}

export async function markCategoryAsDeleted(id: string) {
  try {
    await setDoc(doc(db, 'configuracoes', 'app_setup'), {
      deletedCategoryIds: arrayUnion(id)
    }, { merge: true });
  } catch (e) {
    console.warn('Error marking category as deleted:', e);
  }
}

export async function markProductAsDeleted(id: string) {
  try {
    await setDoc(doc(db, 'configuracoes', 'app_setup'), {
      deletedProductIds: arrayUnion(id)
    }, { merge: true });
  } catch (e) {
    console.warn('Error marking product as deleted:', e);
  }
}
