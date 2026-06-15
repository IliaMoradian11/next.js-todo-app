import { getSession } from "next-auth/react";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res
      .status(400)
      .json({ ok: false, message: "MUST be a POST request" });

  const isConnected = await connectDB();
  if (!isConnected)
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });

  const data = await getSession({ req });
  if (!data)
    return res
      .status(401)
      .json({ ok: false, message: "You are not logged in" });

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
      [req.body.status]: [...user.todos[req.body.status], req.body.title],
    };

    await user.save()
    return res
      .status(201)
      .json({ ok: true, message: "Todo created successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}
