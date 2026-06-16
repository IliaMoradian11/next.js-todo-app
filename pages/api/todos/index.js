import { getSession } from "next-auth/react";
import { v7 as uuidV7 } from "uuid";

import { validStatus } from "@/constants/validStatus";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  const isConnected = await connectDB();
  if (!isConnected)
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });

  if (req.method === "POST") {
    const data = await getSession({ req });
    if (!data)
      return res
        .status(401)
        .json({ ok: false, message: "You are not signed in" });

    try {
      const email = data.user.email;
      const user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({ ok: false, message: "User not found" });

      const { status, title } = req.body;
      if (!validStatus.includes(status) || title.length < 4)
        return res
          .status(422)
          .json({ ok: false, message: "Invalid status or todo name" });

      user.todos[status] = [
        ...user.todos[status],
        { title: title, todoId: uuidV7() },
      ];

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
  } else if (req.method === "GET") {
    try {
      const userData = await getSession({ req });
      if (!userData)
        return res
          .status(401)
          .json({ ok: false, message: "You are not signed in" });

      const email = userData.user.email;
      const user = await User.findOne({ email });
      return res.status(200).json({ ok: true, data: user.todos });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ ok: false, message: "Internal server error" });
    }
  }
}
