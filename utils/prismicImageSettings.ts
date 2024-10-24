export const prismicImageSettings = {
  formats: ["webp", "avif", "jpg", "jpeg", "png", "gif"],

  screens: {
    xs: 360,   // Small mobile devices
    sm: 640,   // Standard mobile
    md: 768,   // Tablets
    lg: 1024,  // Tablets in landscape, smaller laptops
    xl: 1280,  // Larger laptops
    '2xl': 1536, // Ultra-wide screens or higher-res displays
    '3xl': 1920, // Very large desktop screens
  },

  presets: {
    hero: {
      widths: [640, 1024, 1280, 1920, 2560],
      imgixParams: { format: ["avif", "webp"], q: 85, auto: "compress" },
    },
    default: {
      widths: [360, 640, 1024, 1536],
      imgixParams: { format: ["avif", "webp"], q: 85, auto: "compress" },
    },
    small: {
      widths: [200, 400, 600],
      imgixParams: { format: ["avif", "webp"], q: 80, auto: "compress" },
    },
    tiny: {
      widths: [100, 200, 300],
      imgixParams: { format: ["avif", "webp"], q: 70, auto: "compress" },
    },
  },
};
