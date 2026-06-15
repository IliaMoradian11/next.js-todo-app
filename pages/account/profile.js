import Head from "next/head";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";

import styles from "@/styles/pages/profile.module.css";

export default function ProfilePage() {
  const { status, data } = useSession();
  const [user, setUser] = useState({ email: "", firstName: "", lastName: "" });
  const [editingItems, setEditingItems] = useState({});

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.replace("/account/sign-in");
    }
  }, [status]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/user");
        const json = await res.json();
        if (json.ok) {
          setUser(json.data);
        } else {
          toast.error("Couldn't get user datas");
        }
      } catch (err) {
        toast.error("Couldn't get user datas");
      }
    })();
  }, [status, data]);

  function addHandler(e) {
    setEditingItems({
      ...editingItems,
      [e.target.name]: user[e.target.name] || "",
    });
  }

  function cancelHandler(e) {
    const newEditingKeys = Object.keys(editingItems).filter(
      (editing) => editing !== e.target.value,
    );
    const newEditings = {};
    for (const i of newEditingKeys) {
      newEditings[i] = editingItems[i];
    }
    setEditingItems(newEditings);
  }

  function changeHandler(e) {
    setEditingItems({ ...editingItems, [e.target.name]: e.target.value });
  }

  async function submitHandler() {
    const res = await fetch("/api/auth/update", {
      method: "PATCH",
      body: JSON.stringify(editingItems),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    if (json.ok) {
      toast.success(json.message);
      setEditingItems({});
      setUser(json.data);
    } else {
      toast.error(json.message);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo app | Your profile</title>
      </Head>
      {status !== "loading" && status !== "unauthenticated" ? (
        <>
          <h3>
            <CgProfile />
            <span>Profile</span>
          </h3>
          <div className={styles.userDatas}>
            <div>
              {Object.keys(editingItems).includes("firstName") ? (
                <div className={styles.editing}>
                  <p>Name:</p>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="What your first name?"
                    value={editingItems.firstName}
                    onChange={changeHandler}
                  />
                  <button onClick={cancelHandler} value="firstName">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className={styles.showing}>
                  <p>
                    Name:<span>{user.firstName || "-"}</span>
                  </p>
                  <button name="firstName" onClick={addHandler}>
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div>
              {Object.keys(editingItems).includes("lastName") ? (
                <div className={styles.editing}>
                  <p>Last Name:</p>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="What your last name?"
                    value={editingItems.lastName}
                    onChange={changeHandler}
                  />
                  <button onClick={cancelHandler} value="lastName">
                    Cancel
                  </button>
                </div>
              ) : (
                <div className={styles.showing}>
                  <p>
                    Last Name:<span>{user.lastName || "-"}</span>
                  </p>
                  <button name="lastName" onClick={addHandler}>
                    Edit
                  </button>
                </div>
              )}
            </div>
            <div>
              <p>
                Email:<span>{data.user.email}</span>
              </p>
            </div>
          </div>
          {Object.keys(editingItems).length ? (
            <button className={styles.save} onClick={submitHandler}>
              Save
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
