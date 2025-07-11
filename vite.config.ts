import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tamaguiPlugin } from "@tamagui/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  define: {
    DEV: `${process.env.NODE_ENV === 'development' ? true : false}`,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [
        '.web.js',
        '.web.jsx',
        '.web.ts',
        '.web.tsx',
        '.mjs',
        '.js',
        '.mts',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
      ],
      loader: {
        '.js': 'jsx',
      },
    }
  },
  plugins: [
    react(),
    tamaguiPlugin({
      // points to your tamagui config file
      config: "src/tamagui.config.ts",
      // points to any linked packages or node_modules
      // that have tamagui components to optimize
      components: ["tamagui"],
      // turns on the optimizing compiler
      optimize: true,
    }),
  ].filter(Boolean),
});
