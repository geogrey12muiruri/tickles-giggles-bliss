import Image from "next/image";

/**
 * Thin Next/Image wrapper with landing-safe defaults.
 * Static export uses unoptimized images; sizing still matters for layout + LCP.
 */
const OptimizedImage = ({
  src,
  alt,
  priority = false,
  quality = 75,
  sizes = "100vw",
  className,
  fill = false,
  width,
  height,
  ...rest
}) => {
  const shared = {
    src,
    alt: alt ?? "",
    quality,
    sizes,
    className,
    priority,
    ...rest,
  };

  if (fill) {
    return <Image {...shared} fill />;
  }

  return <Image {...shared} width={width} height={height} />;
};

export default OptimizedImage;
