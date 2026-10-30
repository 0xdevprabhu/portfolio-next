import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "0xdevprabhu | Prabhu P Portfolio",
    short_name: "0xdevprabhu",
    description:
      "Certified LAMP Stack Specialist & Full Stack Developer at Noxlay Cyber Tech, Sivakasi. View projects, experience, and contact information.",
    start_url: "/",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/assets/images/profile.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        src: "/assets/images/profile.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}

