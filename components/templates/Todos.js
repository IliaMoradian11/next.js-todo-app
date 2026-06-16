import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TodoCard from "../modules/TodoCard";

import styles from "@/styles/templates/Todos.module.css";

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
      {Object.keys(todos).length === 4
        ? Object.keys(todos).map((todo, index) => (
            <TodoCard
              index={index}
              todosList={todos[todo]}
              key={`status ${index}`}
              setTodos={setTodos}
            />
          ))
        : null}
    </div>
  );
}

export default Todos;
