import { Jost } from "next/font/google";
import "@/styles/landing.scss";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-landing",
});

export default function App({ Component, pageProps }) {
  return (
    <div id="root" className={jost.variable}>
      <Component {...pageProps} />
    </div>
  );
}
