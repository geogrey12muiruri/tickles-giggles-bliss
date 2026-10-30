import Link from "next/link";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import FooterTwo from "@/layout/footers/footer-2";

const ErrorPage = () => (
  <Wrapper>
    <SEO pageTitle="404" />
    <HeaderFour />
    <main className="landing-error">
      <div className="container">
        <p className="landing-error__eyebrow">404</p>
        <h1>This page wandered off.</h1>
        <p className="landing-error__lede">
          Head back to the home page to browse Tickles &amp; Giggles Kids and
          Bliss n Blush.
        </p>
        <Link href="/" className="landing-error__cta">
          Back home
        </Link>
      </div>
    </main>
    <FooterTwo />
  </Wrapper>
);

export default ErrorPage;
