import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrAddCircle } from "react-icons/gr";
import { toast } from "react-toastify";

import StatusRadios from "@/components/modules/StatusRadios";

import styles from "@/styles/pages/add-todo.module.css";

const addTodoStatusTexts = ["todo", "inProgress", "review", "done"];

export default function AddTodoPage() {
  const [form, setForm] = useState({ title: "", status: "todo" });
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.replace("/account/sign-in");
    }
  }, [status]);

  function changeStatusHandler(status) {
    setForm({ ...form, status });
  }

  async function submitHandler() {
    if (form.title.length < 4) {
      toast.error("Todo's title must be more than 4 characters");
      return;
    }

    try {
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.ok) {
        toast.success(json.message);
        setForm({ title: "", status: "todo" });
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Can't create todo, please try again");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo app | Add new todo</title>
      </Head>
      {status !== "loading" && status !== "unauthenticated" ? (
        <>
          <h3>
            <GrAddCircle />
            <span>Add new todo</span>
          </h3>
          <label htmlFor="todo-name">Title:</label>
          <input
            type="text"
            id="todo-name"
            placeholder="new todo"
            className={styles.input}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {addTodoStatusTexts.map((statusText, index) => (
            <StatusRadios
              index={index}
              currentStatus={form.status}
              handler={changeStatusHandler}
              statusText={statusText}
            />
          ))}
          <button onClick={submitHandler} className={styles.submit}>
            Add
          </button>
        </>
      ) : null}
    </div>
  );
}
