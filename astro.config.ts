import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
// import starlightSidebarTopics from "starlight-sidebar-topics";

export default defineConfig({
    output: "static",
    integrations: [
        starlight({
            title: "loop docs",
            favicon: "/favicon.ico",
            logo: {
                light: "./src/assets/logomark-light.png",
                dark: "./src/assets/logomark-dark.png",
                replacesTitle: true,
            },
            components: {
                Hero: "./src/components/Hero.astro",
            },
            customCss: ["./src/styles.css"],
            social: [
                {
                    icon: "github",
                    label: "GitHub",
                    href: "https://github.com/loopui-dev/loop",
                },
            ],
            expressiveCode: {
                themes: ["github-dark", "github-light"],
                styleOverrides: {
                    codeFontFamily: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, 
                    Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
                },
            },
            sidebar: [
                {
                    label: "Events",
                    items: [
                        { label: "Overview", link: "guides/events/overview" },
                        // "guides/events/listening-to-events",
                        "guides/events/streams",
                        "guides/events/type-safe-events",
                    ],
                },
                // {
                //     label: "Iterators",
                //     items: [
                //         { label: "Overview", link: "guides/iterators/overview" },
                //         "guides/iterators/",
                //     ],
                // },
                {
                    label: "Data",
                    items: [
                        { label: "Overview", link: "guides/data/overview" },
                        "guides/data/loaders",
                        "guides/data/actions",
                        "guides/data/revalidation",
                        // "guides/data/forms",
                        "guides/data/progressive-enhancement",
                        "guides/data/fetch-client",
                        // "guides/data/optimistic-updates",
                    ],
                },
                {
                    label: "Fetch Router",
                    items: [
                        { label: "Overview", link: "guides/fetch-router/overview" },
                        "guides/fetch-router/type-safe-handlers",
                        // "guides/fetch-router/cookies-sessions",
                    ],
                },
                {
                    label: "DOM Router",
                    items: [
                        { label: "Overview", link: "guides/dom-router/overview" },
                        "guides/dom-router/routing",
                        "guides/dom-router/navigation",
                        "guides/dom-router/redirects",
                        "guides/dom-router/path-params",
                        "guides/dom-router/search-params",
                        "guides/dom-router/preloading",
                        // "guides/dom-router/navigation-guards",
                        "guides/dom-router/navigation-errors",
                        "guides/dom-router/pending-ui",
                        // "guides/dom-router/view-transitions",
                        // "guides/dom-router/progressive-enhancement",
                    ],
                },
                // { label: "DOM Renderer", items: [] },
                // { label: "Theme", items: [] },
                // { label: "Component Library", items: [] },
                // { label: "Content Layer", items: [] },
                // { label: "App Storage", items: [] },
                // { label: "Database", items: [] },
                // { label: "File Storage", items: [] },
                // { label: "Service Worker", items: [] },
                // { label: "UIKit Renderer", items: [] },
                // { label: "Android Renderer", items: [] },
                // { label: "Native Router", items: [] },
            ],
        }),
    ],
});
