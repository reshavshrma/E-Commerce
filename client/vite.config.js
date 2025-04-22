export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Change to 'dist' so the build output is placed here
    emptyOutDir: true, // Clears old build files before a new build
  },
});
