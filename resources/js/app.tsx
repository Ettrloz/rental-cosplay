import { initializeTheme } from '@/hooks/use-appearance';
import { createInertiaApp } from '@inertiajs/react';
import 'virtual:uno.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
  title: title => (title ? `${title} - ${appName}` : appName),
  strictMode: true,
  progress: {
    color: '#7c3aed'
  }
});

initializeTheme();
