import { Devs } from "@utils/constants";
import definePlugin from "@utils/types";

export default definePlugin({
    name: "BetterMobileLayout",
    description: "Cleaner server list, DM list and profiles with a more mobile-friendly feel",
    authors: [
        {
            name: "You",
            id: 0n
        }
    ],
    version: "1.0.0",

    start() {
        const style = document.createElement("style");
        style.id = "BetterMobileLayout-css";
        style.textContent = `
            /* ===== Better Server List ===== */
            :root {
                --server-list-width: 68px;
            }

            [class*="guilds_"],
            [class*="wrapper_"][class*="guilds"] {
                width: var(--server-list-width) !important;
                min-width: var(--server-list-width) !important;
            }

            [class*="guildIcon"],
            [class*="icon_"][class*="wrapper"] img,
            [class*="avatar_"] {
                border-radius: 16px !important;
                transition: border-radius 0.15s ease, transform 0.15s ease;
            }

            [class*="guildIcon"]:hover,
            [class*="icon_"]:hover {
                border-radius: 12px !important;
                transform: scale(1.05);
            }

            /* ===== Better DM List ===== */
            [class*="privateChannels"] [class*="channel_"],
            [class*="privateChannels"] [class*="container_"] {
                margin: 2px 6px !important;
                border-radius: 10px !important;
                padding: 6px 8px !important;
            }

            [class*="unread_"] {
                background: var(--brand-experiment) !important;
                width: 6px !important;
                height: 6px !important;
                border-radius: 50% !important;
            }

            li:has(a[href="/store"]),
            li:has(a[href="/shop"]),
            li:has(a[href*="quest"]) {
                display: none !important;
            }

            /* ===== Better Profiles ===== */
            [class*="userPopout_"],
            [class*="profilePopout_"],
            [class*="outer_"][class*="userProfile"] {
                border-radius: 16px !important;
                overflow: hidden !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4) !important;
            }

            [class*="banner_"],
            [class*="bannerSVGWrapper"] {
                border-radius: 0 0 12px 12px !important;
            }

            [class*="avatar_"][class*="wrapper"] {
                border: 4px solid var(--background-primary) !important;
                border-radius: 50% !important;
            }

            [class*="bio_"],
            [class*="userInfoSection_"] {
                padding: 12px 16px !important;
                line-height: 1.4 !important;
            }

            [class*="profileEffects"],
            [class*="avatarDecoration"],
            [class*="nameplate"] {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    },

    stop() {
        document.getElementById("BetterMobileLayout-css")?.remove();
    }
});
