// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ProPriyam.github.io',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
