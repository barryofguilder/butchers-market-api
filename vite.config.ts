import { defineConfig, loadEnv } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd());

  return {
    server: {
      // vite server configs, for details see [vite doc](https://vitejs.dev/config/#server-host)
      port: Number(env.VITE_PORT),
    },
    plugins: [
      ...VitePluginNode({
        adapter: 'koa',
        appPath: './src/index.js',
        exportName: 'butcher',

        // Optional, default: false
        // if you want to init your app on boot, set this to true
        initAppOnBoot: true,

        // Optional, default: 'esbuild'
        // The TypeScript compiler you want to use
        // by default this plugin is using vite default ts compiler which is esbuild
        // 'swc' compiler is supported to use as well for frameworks
        // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
        // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
        tsCompiler: 'esbuild',

        // Optional, default: {
        // jsc: {
        //   target: 'es2019',
        //   parser: {
        //     syntax: 'typescript',
        //     decorators: true
        //   },
        //  transform: {
        //     legacyDecorator: true,
        //     decoratorMetadata: true
        //   }
        // }
        // }
        // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
        swcOptions: {},
      }),
    ],
  };
});
