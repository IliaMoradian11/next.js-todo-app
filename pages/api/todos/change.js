import { getSession } from "next-auth/react";

import { validStatus } from "@/constants/validStatus";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "PATCH")
    return res
      .status(400)
      .json({ ok: false, message: "MUST be a PATCH request" });

  const isConnected = await connectDB();
  if (!isConnected)
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });

  try {
    const { todoId, currentStatus, type } = req.body;
    if (
      !todoId ||
      !validStatus.includes(currentStatus) ||
      !["+1", "-1"].includes(type)
    )
      return res.status(422).json({ ok: false, message: "Invalid datas" });

    const data = await getSession({ req });
    if (!data)
      return res
        .status(401)
        .json({ ok: false, message: "You are not signed in" });

    const email = data.user.email;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ ok: false, message: "You are not signed in" });

    let editingTodo;

    user.todos[currentStatus] = user.todos[currentStatus].filter((todo) => {
      if (todo.todoId !== todoId) return true;
      editingTodo = todo;
    });
    if (!editingTodo)
      return res.status(404).json({ ok: false, message: "Todo not found" });

    if (type === "+1") {
      if (validStatus.indexOf(currentStatus) + 1 > validStatus.length)
        return res
          .status(422)
          .json({ ok: false, message: "Can't edit this todo" });

      user.todos[validStatus[validStatus.indexOf(currentStatus) + 1]] = [
        ...user.todos[validStatus[validStatus.indexOf(currentStatus) + 1]],
        editingTodo,
      ];
    } else {
      if (validStatus.indexOf(currentStatus) - 1 < 0)
        return res
          .status(422)
          .json({ ok: false, message: "Can't edit this todo" });

      user.todos[validStatus[validStatus.indexOf(currentStatus) - 1]] = [
        ...user.todos[validStatus[validStatus.indexOf(currentStatus) - 1]],
        editingTodo,
      ];
    }

    await user.save();

    return res
      .status(202)
      .json({ ok: true, message: "Edited successfully", data: user.todos });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}
