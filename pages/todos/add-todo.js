import Head from "next/head";
import { useState } from "react";
import { BiCheckDouble } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { MdSettings, MdStart } from "react-icons/md";
import { TbMapSearch } from "react-icons/tb";
import { toast } from "react-toastify";

import styles from "@/styles/pages/add-todo.module.css";

export default function AddTodoPage() {
  const [form, setForm] = useState({ title: "", status: "todo" });

  function changeStatusHandler(status) {
    setForm({ ...form, status });
  }

  async function submitHandler() {
    if (form.title.length < 4) {
      toast.error("Todo's title must be more than 4 characters");
      return;
    }

    try {
      const res = await fetch("/api/todo/add", {
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
      <button
        className={`${styles.status} ${styles.status1}`}
        onClick={() => changeStatusHandler("todo")}
      >
        <MdStart />
        <span>Todo</span>
        <input
          type="radio"
          name="status"
          checked={form.status === "todo"}
          onChange={() => changeStatusHandler("todo")}
        />
      </button>
      <button
        className={`${styles.status} ${styles.status2}`}
        onClick={() => changeStatusHandler("inProgress")}
      >
        <MdSettings />
        <span>In progress</span>
        <input
          type="radio"
          name="status"
          checked={form.status === "inProgress"}
          onChange={() => changeStatusHandler("inProgress")}
        />
      </button>
      <button
        className={`${styles.status} ${styles.status3}`}
        onClick={() => changeStatusHandler("review")}
      >
        <TbMapSearch />
        <span>Review</span>
        <input
          type="radio"
          name="status"
          checked={form.status === "review"}
          onChange={() => changeStatusHandler("review")}
        />
      </button>
      <button
        className={`${styles.status} ${styles.status4}`}
        onClick={() => changeStatusHandler("done")}
      >
        <BiCheckDouble />
        <span>Done</span>
        <input
          type="radio"
          name="status"
          checked={form.status === "done"}
          onChange={() => changeStatusHandler("done")}
        />
      </button>
      <button onClick={submitHandler} className={styles.submit}>
        Add
      </button>
    </div>
  );
}
