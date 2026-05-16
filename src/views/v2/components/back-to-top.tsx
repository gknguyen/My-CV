import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { AnimatePresence } from '../common/animate-presence';
import { FC, useEffect, useState } from 'react';

export const BackToTop: FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[70] p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
