import React from "react";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import FooterTwo from "@/layout/footers/footer-2";
import ContactBreadcrumb from "@/components/breadcrumb/contact-breadcrumb";
import ContactArea from "@/components/contact/contact-area";
import ContactMap from "@/components/contact/contact-map";

const ContactPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Contact" noIndex={false} />
      <HeaderFour />
      <main>
        <ContactBreadcrumb />
        <ContactArea />
        <ContactMap />
      </main>
      <FooterTwo />
    </Wrapper>
  );
};

export default ContactPage;
