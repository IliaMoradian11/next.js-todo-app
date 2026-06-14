import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "react-toastify/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}
