import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import babel from '@rolldown/plugin-babel';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { networkInterfaces } from 'node:os';
import unocss from 'unocss/vite';
import { defineConfig, lazyPlugins } from 'vite-plus';

function isPrivateIPv4(address: string): boolean {
  const parts = address.split('.').map(Number);
  if (parts.length !== 4 || parts.some(part => Number.isNaN(part))) {
    return false;
  }
  const [a, b] = parts;
  return a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
}

function detectLocalIp(): string {
  const candidates: string[] = [];
  for (const addresses of Object.values(networkInterfaces())) {
    for (const address of addresses ?? []) {
      if (address.family === 'IPv4' && !address.internal) {
        candidates.push(address.address);
      }
    }
  }

  const lanIp = candidates.find(isPrivateIPv4);

  return lanIp ?? candidates[0] ?? '127.0.0.1';
}

const EXPOSED_PORT = 9001;
const PHP_TARGET = process.env.PHP_DEV_URL ?? 'http://127.0.0.1:9011';
const LAN_IP = process.env.DEV_SERVER_HOST ?? detectLocalIp();

const VITE_OWNED = [
  '@vite',
  '@id',
  '@fs',
  '@react-refresh',
  'node_modules',
  'resources',
  '__laravel_vite_plugin__',
  '__inertia_ssr'
].join('|');

export default defineConfig({
  plugins: lazyPlugins(() => [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
      fonts: [
        bunny('Instrument Sans', {
          weights: [400, 500, 600]
        })
      ]
    }),
    inertia(),
    react(),
    babel({
      presets: [reactCompilerPreset()]
    }),
    unocss(),
    wayfinder({
      formVariants: true
    })
  ]),
  server: {
    host: true,
    port: EXPOSED_PORT,
    strictPort: true,
    allowedHosts: true,
    proxy: {
      [`^/(?!${VITE_OWNED})`]: {
        target: PHP_TARGET,
        changeOrigin: false
      }
    },
    hmr: {
      host: LAN_IP
    },
    watch: {
      ignored: ['**/.agents/**', '**/.claude/**', '**/.cursor/**', '**/.junie/**', '**/vendor/**']
    }
  },
  lint: {
    ignorePatterns: [
      'vendor/**',
      'node_modules/**',
      'public/**',
      'bootstrap/ssr/**',
      'tailwind.config.js',
      'resources/js/actions/**',
      'resources/js/components/ui/*',
      'resources/js/routes/**',
      'resources/js/wayfinder/**'
    ],
    options: {
      denyWarnings: true,
      typeAware: true
    }
  },
  fmt: {
    printWidth: 80,
    tabWidth: 4,
    singleQuote: true,
    semi: true,
    singleAttributePerLine: false,
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: [
      '.github/**',
      'composer.json',
      'resources/js/components/ui/*',
      'resources/views/mail/*'
    ],
    sortTailwindcss: {
      functions: ['clsx', 'cn', 'cva'],
      stylesheet: 'resources/css/app.css'
    }
  }
});
