import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/influx.min.js',
            name: 'influx',
            format: 'umd',
            sourcemap: true,
            plugins: [terser()],
            exports: 'named', // Or remove the default export entirely
        },
        {
            file: 'dist/influx.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named', // Or remove the default export entirely
        },
        {
            file: 'dist/influx.esm.js',
            format: 'es',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
        }),
    ],
};
