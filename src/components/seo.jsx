import Head from "next/head";


const SEO = ({
  pageTitle,
  description = "Shop kidswear, shoes, school bags, furniture, home accents and kitchen finds from Tickles & Giggles and Bliss n Blush in Nairobi.",
  noIndex = true,
}) => (
  <>
    <Head>
      <title>
        {pageTitle ? `${pageTitle} | Tickles & Giggles and Bliss` : "Tickles & Giggles Kids and Bliss n Blush"}
      </title>
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="icon" href="/favicon.png" />
    </Head>
  </>
);

export default SEO;