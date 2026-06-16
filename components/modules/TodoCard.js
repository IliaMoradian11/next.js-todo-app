import { BiBookBookmark } from "react-icons/bi";
import { RiTriangleLine } from "react-icons/ri";
import { toast } from "react-toastify";

import { validStatus } from "@/constants/validStatus";
import { statusColors, statusTexts } from "@/constants/status";

import styles from "@/styles/modules/TodoCard.module.css";

function TodoCard({ index, todosList, setTodos }) {
  async function moveTodoHandler(todoId, type) {
    try {
      const res = await fetch("/api/todos/change", {
        method: "PATCH",
        body: JSON.stringify({
          todoId,
          currentStatus: validStatus[index],
          type,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json.ok) {
        setTodos(json.data);
      } else {
        toast.error(json.message);
      }
    } catch (err) {
      toast.error("Couldn't edit todo, please try again");
    }
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.cardHeader}
        style={{ backgroundColor: statusColors[index] }}
      >
        {statusTexts[index]}
      </div>
      <div className={styles.cardContent}>
        {todosList.length ? (
          todosList.map((todo) => (
            <div className={styles.todo} key={todo.todoId}>
              <div
                className={styles.todoTopLine}
                style={{ backgroundColor: statusColors[index] }}
              ></div>
              <BiBookBookmark />
              <p>{todo.title}</p>
              <div className={styles.todoButtons}>
                <button
                  style={index === 0 ? { visibility: "hidden" } : null}
                  onClick={() => moveTodoHandler(todo.todoId, "-1")}
                >
                  <RiTriangleLine style={{ transform: "rotate(-90deg)" }} />
                  <span>Back</span>
                </button>
                <button
                  style={index === 3 ? { visibility: "hidden" } : null}
                  onClick={() => moveTodoHandler(todo.todoId, "+1")}
                >
                  <span>Next</span>
                  <RiTriangleLine style={{ transform: "rotate(90deg)" }} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ marginBottom: "20px", fontSize: "1.2rem" }}>
            No todo
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
