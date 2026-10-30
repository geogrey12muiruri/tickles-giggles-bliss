import store from "@/redux/store";
import { Provider } from "react-redux";
import ReactModal from "react-modal";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/index.scss";

if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const usesBootstrapTabs =
      router.pathname.startsWith("/product-details") ||
      ["/shop", "/shop-hidden-sidebar", "/shop-right-sidebar", "/blog-grid", "/profile"].includes(
        router.pathname
      );

    if (usesBootstrapTabs) {
      import("bootstrap/dist/js/bootstrap");
    }
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <div id="root">
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
