import { MoonIcon, SunIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/store/ui.store';
import type { HeaderProps } from '@/types/common.types';

export default function Header({ title, projectLink }: HeaderProps) {
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggle);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeIn' }}
      className="space-y-2 md:flex md:items-center md:justify-between md:space-y-0"
    >
      <h4 className="text-center text-lg font-medium tracking-tight">{title}</h4>
      <div className="flex items-center justify-center gap-1">
        <Button variant={'secondary'} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Separator orientation="vertical" />
        <Button variant={'outline'} asChild>
          <a href={projectLink} target="_blank" rel="noopener noreferrer">
            <FaGithub /> Code
          </a>
        </Button>
      </div>
    </motion.header>
  );
}
