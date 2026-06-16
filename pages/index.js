import Head from "next/head";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import Todos from "@/components/templates/Todos";

export default function Home() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.replace("/account/sign-in");
    }
  }, [status]);

  return (
    <div>
      <Head>
        <title>Todo app | Your todos</title>
      </Head>
      <Todos />
    </div>
  );
}
