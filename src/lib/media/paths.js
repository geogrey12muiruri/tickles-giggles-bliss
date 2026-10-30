/** Normalize any image filename to the WebP we serve from client folders. */
const toWebp = (file) => String(file).replace(/\.(jpe?g|png)$/i, ".webp");

/** Kids / Bliss photos live under public/assets/img/client/{kids|bliss} as WebP. */
export const shopAsset = (folder, file) =>
  `/assets/img/client/${folder}/${toWebp(file)}`;

export const kidsAsset = (file) => shopAsset("kids", file);
export const blissAsset = (file) => shopAsset("bliss", file);

/** Hero photos live under public/assets/img/hero as WebP. */
export const heroAsset = (file) => `/assets/img/hero/${toWebp(file)}`;
