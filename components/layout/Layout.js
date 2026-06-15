import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BiCommentAdd } from "react-icons/bi";
import { BsTextLeft } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-toastify";

import styles from "@/styles/layout/Layout.module.css";

function Layout({ children }) {
  const { status } = useSession();

  async function signOutHandler() {
    await signOut({ redirect: false });
    toast.success("Signed out successfully");
  }

  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <h2>Todo app | Next.js Fullstack Project</h2>
        </Link>
        {status === "authenticated" ? (
          <button onClick={signOutHandler}>
            <span>Logout</span>
            <LuLogOut />
          </button>
        ) : null}
        {status === "unauthenticated" ? (
          <button>
            <Link href="/account/sign-in">Sign in</Link>
          </button>
        ) : null}
      </header>
      <div className={styles.content}>
        <aside>
          <div>Welcome👋</div>
          <ul>
            <li>
              <Link href="/">
                <BsTextLeft />
                Todos
              </Link>
            </li>
            <li>
              <Link href="/todos/add-todo">
                <BiCommentAdd />
                Add todo
              </Link>
            </li>
            <li>
              <Link href="/account/profile">
                <CgProfile />
                Profile
              </Link>
            </li>
          </ul>
        </aside>
        <main>{children}</main>
      </div>
    </>
  );
}

export default Layout;
