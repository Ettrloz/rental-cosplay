import { defineConfig, presetWind4 } from 'unocss';

export default defineConfig({
  presets: [presetWind4()],
  darkMode: 'class',
  theme: {
    colors: {
      page: 'var(--page)',
      nav: 'var(--nav)',
      panel: 'var(--panel)',
      card: 'var(--card)',
      card2: 'var(--card2)',
      raised: 'var(--raised)',
      line: 'var(--line)',
      line2: 'var(--line2)',
      chip: 'var(--chip)',
      chip2: 'var(--chip2)',
      chip3: 'var(--chip3)',
      fg: 'var(--fg)',
      fg2: 'var(--fg2)',
      muted: 'var(--muted)',
      dim: 'var(--dim)',
      faint: 'var(--faint)',
      fade: 'var(--fade)',
      accent: 'var(--accent)',
      'accent-hover': 'var(--accent-hover)',
      'accent-soft': 'var(--accent-soft)',
      'accent-text': 'var(--accent-text)'
    }
  }
});
