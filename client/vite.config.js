import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { port: 3000 },
    resolve: {
        alias: {
            config: path.resolve(__dirname, "..", "config.json"),
            styles: path.resolve(__dirname, "/src/styles"),
            components: path.resolve(__dirname, "/src/components"),
            hooks: path.resolve(__dirname, "/src/hooks"),
        },
    },
})
