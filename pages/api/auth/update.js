import { getSession } from "next-auth/react";

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
    const data = await getSession({ req });
    const email = data.user.email;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ ok: false, message: "User not found" });

    for (const i in req.body) {
      if (!["firstName", "lastName"].includes(i))
        return res.status(422).json({
          ok: false,
          message: `Error: You have sended a data named ${i}`,
        });

      user[i] = req.body[i];
    }

    await user.save();
    return res.status(200).json({
      ok: true,
      message: "Updated successfully",
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}
