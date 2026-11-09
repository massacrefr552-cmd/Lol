// bundle/src/plugins/t1layout/index.ts
// T1-style layout for Endcord Mobile: server dock along the bottom, compact chat.
//
// STATUS: UNTESTED SCAFFOLD. Everything that touches Discord's own screens depends on
// module paths I could not read. Those spots are marked  >>> FILL IN <<<.
// The plugin is written so it will NOT crash while they are unfilled: it logs a warning
// and leaves Discord's layout alone. The settings and the chat tweaks do not need them.
//
// Documented API used (docs/PLUGINS.md): definePlugin, settings schema,
// start({ store, cleanup }), onMessageRow.
// Guessed: import paths, moduleAt usage, and the row fields (spacing, hideAvatar, hideTime).
import { definePlugin } from "../api";
import { moduleAt, onMessageRow } from "../hooks";
// copy the t / tx import from any existing plugin

// >>> FILL IN <<< the module that renders the server list (left rail).
// Find it by opening an existing plugin that changes the server list (e.g. ServerPinner)
// and copying the path it passes to moduleAt().
const GUILD_LIST_MODULE = "REPLACE_WITH_SERVER_LIST_MODULE_PATH";

// Style applied to the server list once it is found: a horizontal bar pinned to the bottom.
const dockStyle = (position: "bottom" | "top") => ({
    flexDirection: "row" as const,
    alignItems: "center" as const,
    height: 64,
    width: "100%" as const,
    paddingHorizontal: 12,
    backgroundColor: "#0d0d0d",
    borderTopWidth: position === "bottom" ? 1 : 0,
    borderBottomWidth: position === "top" ? 1 : 0,
    borderColor: "#333333",
});

export default definePlugin({
    id: "endcord.t1layout",
    name: "T1Layout",
    description: tx("Server dock along the bottom and a compact, textured chat layout"),
    settings: {
        dockPosition: {
            type: "select",
            label: tx("Server dock position"),
            default: "bottom",
            options: [
                { label: tx("Bottom"), value: "bottom" },
                { label: tx("Top"), value: "top" },
            ],
        },
        showServerNames: { type: "boolean", label: tx("Show server names under icons"), default: false },
        compact: { type: "boolean", label: tx("Compact messages"), default: true },
        hideAvatars: { type: "boolean", label: tx("Hide avatars"), default: false },
        hideTimes: { type: "boolean", label: tx("Hide timestamps"), default: false },
    },
    start({ store, cleanup }) {
        // ---- 1. Chat tweaks (only needs onMessageRow) ----
        cleanup(
            onMessageRow("t1layout", row => {
                if (store.compact) row.spacing = 0;
                if (store.hideAvatars) row.hideAvatar = true;
                if (store.hideTimes) row.hideTime = true;
                return row;
            }),
        );

        // ---- 2. Server dock (needs the module path above) ----
        if (GUILD_LIST_MODULE.startsWith("REPLACE")) {
            console.warn("[T1Layout] GUILD_LIST_MODULE not set, leaving the server list alone.");
            return;
        }
        try {
            const unpatch = moduleAt(GUILD_LIST_MODULE, mod => {
                // >>> FILL IN <<< wrap the component the way your reference plugin does,
                // then merge dockStyle(store.dockPosition) into the style prop of its
                // root container, and (if store.showServerNames) render each guild's
                // name under its icon.
                const style = dockStyle(store.dockPosition);
                void style;
                return mod;
            });
            cleanup(unpatch);
        } catch (e) {
            console.warn("[T1Layout] could not patch the server list:", e);
        }
    },
});
