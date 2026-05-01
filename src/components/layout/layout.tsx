import { motion } from 'motion/react';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { useThemeSync } from '@/hooks/use-theme-sync';
import type { LayoutProps } from '@/types/common.types';

export default function Layout({ children }: LayoutProps) {
  useThemeSync();

  return (
    <div className="mx-auto flex h-dvh max-w-6xl flex-col overflow-hidden p-4">
      <Header title="00-project-title" projectLink="https://www.x.com" />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'backIn' }}
        className="full-shadow my-4 flex flex-1 flex-col justify-start gap-2 overflow-y-auto rounded-lg border p-4"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
