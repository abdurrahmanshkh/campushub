import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Build60 Campus Growth Hub",
    short_name: "Build60",
    description: "Campus-distribution operating system for practical developer workshops.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F3",
    theme_color: "#0B1220",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
