import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout/Layout";
import { ToastContainer } from "react-toastify";

import "@/styles/globals.css";
import "react-toastify/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
}
