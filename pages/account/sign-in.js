import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-toastify";

import styles from "@/styles/pages/forms.module.css";

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (status === "authenticated") {
      window.location.replace("/account/profile");
    }
  }, [status]);

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (form.email.length < 4 || form.password.length < 4) {
      toast.error("Invalid username or password");
      return;
    }

    const res = await signIn("credentials", { ...form, redirect: false });
    if (res.ok) {
      toast.success("Logged in successfully");
      router.push("/account/profile");
    } else {
      toast.error(res.error);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Todo app | Sign in to your account!</title>
      </Head>
      {status !== "loading" && status !== "authenticated" ? (
        <div className={styles.container}>
          <h2>Login Form</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={changeHandler}
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={changeHandler}
            />
            <button type="submit">Login</button>
            <p>
              Create account?
              <Link href="/account/sign-up">Sign up</Link>
            </p>
          </form>
        </div>
      ) : null}
    </div>
  );
}
