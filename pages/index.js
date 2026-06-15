import Head from "next/head";

import Todos from "@/components/templates/Todos";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Todo app | Todos</title>
      </Head>
      <Todos />
    </div>
  );
}
