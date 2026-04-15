import { motion } from 'motion/react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useThemeSync } from '@/hooks/use-theme-sync';
import type { LayoutProps } from '@/types/common.types';

export default function Layout({ children }: LayoutProps) {
  useThemeSync();

  return (
    <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden p-4">
      <Header title="01-todo-list" projectLink="https://github.com/davePawww/rws-todo-list" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'backIn' }}
        className="full-shadow my-4 min-h-0 flex-1 overflow-y-auto rounded-lg p-4"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
