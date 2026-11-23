// Plain object (no `vitest/config` import): vitest 4 is ESM-only and this
// package is CJS, so importing defineConfig fails on Node 20.18.
export default {
  test: {
    include: ["tests/**/*.test.ts"],
    exclude: ["e2e/**", "node_modules/**"],
  },
};
