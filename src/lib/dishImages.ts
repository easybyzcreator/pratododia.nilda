import React from 'react';

export const DISH_LOCAL_IMAGES: Record<string, string> = {
  'lasanha': '/images/dishes/lasanha-lowcarb.png',
  'mini quibe': '/images/dishes/mini-quibe.jpg',
  'strogonoff': '/images/dishes/strogonoff.jpg',
  'feijoada': '/images/dishes/feijoada.jpg',
  'satay': '/images/dishes/grao-de-bico-satay.jpg',
  'kit detox': '/images/dishes/kit-detox.jpg',
  'detox': '/images/dishes/kit-detox.jpg',
  'burguer': '/images/dishes/burguer-grao-de-bico.jpg',
  'mexicana': '/images/dishes/marmita-mexicana.jpg',
  'moqueca': '/images/dishes/moqueca.jpg',
  'escondidinho': '/images/dishes/escondidinho-de-abobora.jpg',
  'beringela caprese': '/images/dishes/beringela-caprese.jpg',
  'berinjela caprese': '/images/dishes/beringela-caprese.jpg',
  'beringela': '/images/dishes/beringela-caprese.jpg',
  'berinjela': '/images/dishes/beringela-caprese.jpg',
};

export function getSafeDishImage(product: { image?: string; title?: string } | null | undefined): string {
  if (!product) return '/images/dishes/feijoada.jpg';

  const title = (product.title || '').toLowerCase();

  // If title matches one of the standard dishes, prioritize the bundled high-resolution local asset
  for (const [key, path] of Object.entries(DISH_LOCAL_IMAGES)) {
    if (title.includes(key)) {
      return path;
    }
  }

  // If it's a custom uploaded image (base64) or already a local static path, use it directly
  if (product.image && (product.image.startsWith('/images/') || product.image.startsWith('data:image/'))) {
    return product.image;
  }

  // If it's an external URL that isn't from imgbb, return it
  if (product.image && product.image.trim() !== '' && !product.image.includes('ibb.co')) {
    return product.image;
  }

  return '/images/dishes/feijoada.jpg';
}

export function handleDishImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, title?: string) {
  const target = e.currentTarget;
  const safeImg = getSafeDishImage({ title });
  if (target.src !== window.location.origin + safeImg && target.src !== safeImg) {
    target.src = safeImg;
  }
}
