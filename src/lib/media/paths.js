/** Build a public URL for an optimized landing asset. */
export const optimizedAsset = (folder, file) => {
  const webp = String(file).replace(/\.(jpe?g|png)$/i, ".webp");
  return `/assets/img/optimized/${folder}/${webp}`;
};

export const kidsAsset = (file) => optimizedAsset("kids", file);
export const blissAsset = (file) => optimizedAsset("bliss", file);
export const heroAsset = (file) => optimizedAsset("hero", file);
