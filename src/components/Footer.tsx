import React from 'react';
import { motion } from 'motion/react';

interface FooterProps {
  isAdmin?: boolean;
}

export default function Footer({ isAdmin }: FooterProps) {
  // Detect if on admin page via prop or current URL
  const isCurrentlyAdmin = Boolean(
    isAdmin || 
    (typeof window !== 'undefined' && (
      window.location.pathname === '/admin' || 
      window.location.pathname.startsWith('/admin') || 
      window.location.hash.includes('admin')
    ))
  );

  return (
    <footer className="w-full py-8 flex flex-col items-center justify-center gap-4 mt-auto">
      {/* Tag de Aluno(a)/Mentorado(a) exibida SOMENTE no Painel Administrativo */}
      {isCurrentlyAdmin && (
        <a 
          href="https://links.chefgabipaludo.com/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnJRCKf_VEAmsGJnELOZPDdjtFN9gE6KJiIMIWlItrw3OPJN7DpGcv9562G9s_aem_qLFkDEcXheET3uWmK1wM2Q" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded-2xl bg-white border-2 border-[#424733]/80 hover:bg-white/95 active:scale-98 transition-all text-center w-full max-w-[200px] h-[80px] cursor-pointer shadow-md overflow-hidden px-3 py-1 mb-2"
        >
          <span className="text-[9px] font-bold tracking-[0.25em] text-gray-400 uppercase -mt-1">
            ALUNO(A)/MENTORADO(A)
          </span>
          <div className="w-full flex items-center justify-center h-[45px] overflow-hidden mt-0.5">
            <img 
              src="/images/dishes/egn-logo.png" 
              alt="Escola de Gastronomia e Negócios" 
              className="h-[130px] w-auto object-contain max-w-none transform scale-[1.65]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/egnn.png';
              }}
            />
          </div>
        </a>
      )}

      <p className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#424733] uppercase mt-1">
        DESENVOLVIDO POR
      </p>
      <a 
        href="https://www.easybyzcreator.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group mt-2"
      >
        <motion.img 
          src="/images/dishes/easybyz-logo.png" 
          alt="EasyByz Logo" 
          className="h-[110px] object-contain"
          initial={{ 
            filter: 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(255%) hue-rotate(34deg) brightness(91%) contrast(68%) opacity(0.8)',
            scale: 0.95
          }}
          whileHover={{ 
            filter: 'brightness(0) saturate(100%) invert(14%) sepia(100%) saturate(255%) hue-rotate(34deg) brightness(91%) contrast(68%) opacity(1)',
            scale: 1.05
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/dishes/easybyz-logo.png';
          }}
        />
      </a>
    </footer>
  );
}
