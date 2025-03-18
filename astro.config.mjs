// @ts-check
import { defineConfig } from 'astro/config'

import netlify from '@astrojs/netlify'
import clerk from '@clerk/astro'

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [clerk(), react()],
    adapter: netlify(),
    output: 'server'
})