import { defineConfig } from "vite";

// plugins
import solidPlugin from "solid-start/vite";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig({
	plugins: [solidPlugin({ ssr: false }), suidPlugin()],
});
