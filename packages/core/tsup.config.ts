import { defineConfig, type Options } from 'tsup';

const options: Options = {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    splitting: false,
    sourcemap: true,
    minify: false,
    target: 'es2022',
    banner: {
        js: "'use client';",
    },
};

export default defineConfig(options);
