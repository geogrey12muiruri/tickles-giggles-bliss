import dynamic from "next/dynamic";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import JewelryShopBanner from "@/components/shop-banner/jewelry-shop-banner";
import HomeStoreSection from "@/components/products/jewelry/home-store-section";
import FooterTwo from "@/layout/footers/footer-2";

/* Below-the-fold: keep out of the initial JS parse to cut TBT */
const JewelryBanner = dynamic(() => import("@/components/banner/jewelry-banner"), {
  ssr: true,
});
const JewelryAbout = dynamic(() => import("@/components/about/jewelry-about"), {
  ssr: true,
});
const PopularProducts = dynamic(
  () => import("@/components/products/jewelry/popular-products"),
  { ssr: true }
);
const InstagramAreaFour = dynamic(
  () => import("@/components/instagram/instagram-area-4"),
  { ssr: true }
);

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" noIndex={false} />
      <HeaderFour />
      <main>
        <JewelryShopBanner />
        <HomeStoreSection />
        <JewelryBanner />
        <JewelryAbout />
        <PopularProducts />
        <InstagramAreaFour />
      </main>
      <FooterTwo />
    </Wrapper>
  );
}
