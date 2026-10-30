import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import JewelryBanner from "@/components/banner/jewelry-banner";
import HomeStoreSection from "@/components/products/jewelry/home-store-section";
import JewelryShopBanner from "@/components/shop-banner/jewelry-shop-banner";
import JewelryAbout from "@/components/about/jewelry-about";
import PopularProducts from "@/components/products/jewelry/popular-products";
import InstagramAreaFour from "@/components/instagram/instagram-area-4";
import FooterTwo from "@/layout/footers/footer-2";

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
