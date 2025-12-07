import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 4173,
  },

  plugins: [
    react(),

    // Remove comentários de sourcemap
    {
      name: "remove-sourcemap-comments",
      enforce: "post",
      apply: "build",
      generateBundle(_, bundle) {
        for (const key in bundle) {
          const file = bundle[key];
          if (file.type === "chunk") {
            file.code = file.code.replace(/\/\/# sourceMappingURL=.*/g, "");
          }
        }
      },
    },
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // FORÇA modo production internamente
  define: {
    __DEV__: false,
    "process.env.NODE_ENV": '"production"',
  },

  esbuild: {
    legalComments: "none", // Remove comentários que poderiam expor caminhos
  },

  build: {
    minify: "terser",
    sourcemap: false, // Nunca gerar sourcemaps no build final
    cssCodeSplit: false,
    chunkSizeWarningLimit: 2000,

    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.warn",
        ],
        passes: 3,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_proto: true,
      },

      mangle: {
        toplevel: true,
        safari10: true,
        properties: {
          regex: /^_/,
        },
      },

      format: {
        comments: false,
        preamble: "/* 4Track - Protected Code */",
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "v";
          if (id.includes("/src/pages/")) return "p";
          if (id.includes("/src/components/")) return "c";
        },
        chunkFileNames: "a/[hash].js",
        entryFileNames: "a/[hash].js",
        assetFileNames: "a/[hash].[ext]",
      },
    },
  },
}));
