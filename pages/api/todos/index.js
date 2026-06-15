import { getSession } from "next-auth/react";
import { v7 as uuidV7 } from "uuid";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const isConnected = await connectDB();
    if (!isConnected)
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });

    const data = await getSession({ req });
    if (!data || !data?.user?.email)
      return res
        .status(401)
        .json({ ok: false, message: "You are not signed in" });

    try {
      const email = data.user.email;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ ok: false, message: "User not found" });

      const { status, title } = req.body;
      if (
        !["todo", "inProgress", "review", "done"].includes(status) ||
        title.length < 4
      )
        return res
          .status(422)
          .json({ ok: false, message: "Invalid status or todo name" });

      user.todos = {
        ...user.todos,
        [req.body.status]: [
          ...user.todos[req.body.status],
          { title: req.body.title, todoId: uuidV7() },
        ],
      };

      await user.save();
      return res
        .status(201)
        .json({ ok: true, message: "Todo created successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    }
  } else if (req.method === "PATCH") {
    return res.status(500).json("not developed yet!!");
  }
}
