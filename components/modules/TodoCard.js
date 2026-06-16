import { BiBookBookmark } from "react-icons/bi";
import { RiTriangleLine } from "react-icons/ri";

import styles from "@/styles/modules/TodoCard.module.css";

import { statusColors, statusTexts } from "@/constants/status";

function TodoCard({ index, todosList }) {
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
            <div className={styles.todo}>
              <div
                className={styles.todoTopLine}
                style={{ backgroundColor: statusColors[index] }}
              ></div>
              <BiBookBookmark />
              <p>{todo.title}</p>
              <div className={styles.todoButtons}>
                <button>
                  <RiTriangleLine style={{ transform: "rotate(-90deg)" }} />
                  <span>Back</span>
                </button>
                <button>
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
