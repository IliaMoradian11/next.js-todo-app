import Link from "next/link";
import { BiCommentAdd } from "react-icons/bi";
import { BsTextLeft } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LuLogOut } from "react-icons/lu";

import styles from "@/styles/layout/Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h2>Todo app | Next.js Fullstack Project</h2>
        <button>
          <span>Logout</span>
          <LuLogOut />
        </button>
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
