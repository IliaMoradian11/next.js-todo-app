import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import styles from "@/styles/pages/forms.module.css";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  function changeHandler(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (form.email.length < 4 || form.password.length < 4) {
      toast.error("Invalid username or password");
      return;
    }

    const res = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (json.ok) {
      const response = await signIn("credentials", {
        ...form,
        redirect: false,
      });
      if (response.ok) {
        toast.success("Successfully sign up");
        router.push("/account/profile");
      } else {
        toast.error("Account created; please login.");
        router.push("/account/sign-in");
      }
    } else {
      toast.error(json.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Todo app | Sign in to your account!</title>
      </Head>
      <div className={styles.container}>
        <h2>Sign-up Form</h2>
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
          <button type="submit">Sign up</button>
          <p>
            Have an account?
            <Link href="/account/sign-in">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
