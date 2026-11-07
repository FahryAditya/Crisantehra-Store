import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Crisanthera Store — Anime Stickers & Next.js Templates",
    short_name: "Crisanthera",
    description: "Marketplace stiker anime vinyl premium dan template website Next.js modern dengan estetika Ethereal Bento.",
    start_url: "/",
    display: "standalone",
    background_color: "#090a0f",
    theme_color: "#090a0f",
    orientation: "portrait",
    categories: ["shopping", "entertainment", "developer"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

