import { useEffect, useState } from "react";
import { BiBookBookmark } from "react-icons/bi";
import { toast } from "react-toastify";
import { RiTriangleLine } from "react-icons/ri";

import styles from "@/styles/pages/HomePage.module.css";

function Todos() {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/todos");
        const json = await res.json();
        if (json.ok) {
          setTodos(json.data);
        } else {
          toast.error(json.message);
        }
      } catch (err) {
        toast.error("Couldn't get todos; please try again");
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      {Object.keys(todos).length === 4 ? (
        <>
          <div className={styles.cards}>
            <div
              className={styles.cardHeader}
              style={{ backgroundColor: "gold" }}
            >
              Todo
            </div>
            <div className={styles.cardContent}>
              {todos.todo.length ? (
                todos.todo.map((todo) => (
                  <div className={styles.todo}>
                    <div
                      className={styles.todoTopLine}
                      style={{ backgroundColor: "gold" }}
                    ></div>
                    <BiBookBookmark />
                    <p>{todo.title}</p>
                    <div className={styles.todoButtons}>
                      <button>
                        <RiTriangleLine
                          style={{ transform: "rotate(-90deg)" }}
                        />
                        <span>Back</span>
                      </button>
                      <button>
                        <span>Next</span>
                        <RiTriangleLine
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No todo</div>
              )}
            </div>
          </div>
          <div className={styles.cards}>
            <div
              className={styles.cardHeader}
              style={{ backgroundColor: "mediumspringgreen" }}
            >
              In progress
            </div>
            <div className={styles.cardContent}>
              {todos.inProgress.length ? (
                todos.inProgress.map((todo) => (
                  <div className={styles.todo}>
                    <div
                      className={styles.todoTopLine}
                      style={{ backgroundColor: "mediumspringgreen" }}
                    ></div>
                    <BiBookBookmark />
                    <p>{todo.title}</p>
                    <div className={styles.todoButtons}>
                      <button>
                        <RiTriangleLine
                          style={{ transform: "rotate(-90deg)" }}
                        />
                        <span>Back</span>
                      </button>
                      <button>
                        <span>Next</span>
                        <RiTriangleLine
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No todo</div>
              )}
            </div>
          </div>
          <div className={styles.cards}>
            <div
              className={styles.cardHeader}
              style={{ backgroundColor: "blue" }}
            >
              Review
            </div>
            <div className={styles.cardContent}>
              {todos.review.length ? (
                todos.review.map((todo) => (
                  <div className={styles.todo}>
                    <div
                      className={styles.todoTopLine}
                      style={{ backgroundColor: "blue" }}
                    ></div>
                    <BiBookBookmark />
                    <p>{todo.title}</p>
                    <div className={styles.todoButtons}>
                      <button>
                        <RiTriangleLine
                          style={{ transform: "rotate(-90deg)" }}
                        />
                        <span>Back</span>
                      </button>
                      <button>
                        <span>Next</span>
                        <RiTriangleLine
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No todo</div>
              )}
            </div>
          </div>
          <div className={styles.cards}>
            <div
              className={styles.cardHeader}
              style={{ backgroundColor: "turquoise" }}
            >
              Done
            </div>
            <div className={styles.cardContent}>
              {todos.done.length ? (
                todos.done.map((todo) => (
                  <div className={styles.todo}>
                    <div
                      className={styles.todoTopLine}
                      style={{ backgroundColor: "turquoise" }}
                    ></div>
                    <BiBookBookmark />
                    <p>{todo.title}</p>
                    <div className={styles.todoButtons}>
                      <button>
                        <RiTriangleLine
                          style={{ transform: "rotate(-90deg)" }}
                        />
                        <span>Back</span>
                      </button>
                      <button>
                        <span>Next</span>
                        <RiTriangleLine
                          style={{ transform: "rotate(90deg)" }}
                        />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No todo</div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Todos;
