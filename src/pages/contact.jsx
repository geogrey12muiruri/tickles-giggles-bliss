import Link from "next/link";
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderFour from "@/layout/headers/header-4";
import FooterTwo from "@/layout/footers/footer-2";
import { BLISS_INSTAGRAM, KIDS_INSTAGRAM } from "@/data/client-catalog";

const phones = [
  { number: "0797 729 738", href: "tel:+254797729738" },
  { number: "0111 703 747", href: "tel:+254111703747" },
];

const ContactPage = () => (
  <Wrapper>
    <SEO pageTitle="Contact" noIndex={false} />
    <HeaderFour />
    <main className="landing-contact">
      <div className="container">
        <p className="landing-contact__eyebrow">Say hello</p>
        <h1>Visit or message us.</h1>
        <p className="landing-contact__lede">
          Tickles &amp; Giggles Kids and Bliss n Blush are happiest answering
          questions in person or on Instagram.
        </p>

        <div className="landing-contact__grid">
          <article>
            <h2>Tickles &amp; Giggles Kids</h2>
            <p>Ufundi Coop, Jeevanjee · Nairobi CBD</p>
            <a href={KIDS_INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </article>
          <article>
            <h2>Bliss n Blush</h2>
            <p>Malik Heights, Adams Arcade · Ngong Road</p>
            <a href={BLISS_INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </article>
          <article>
            <h2>Call</h2>
            <ul>
              {phones.map((phone) => (
                <li key={phone.number}>
                  <a href={phone.href}>{phone.number}</a>
                </li>
              ))}
            </ul>
            <p>
              <Link href="/">Back home</Link>
            </p>
          </article>
        </div>
      </div>
    </main>
    <FooterTwo />
  </Wrapper>
);

export default ContactPage;
