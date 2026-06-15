import { getSession } from "next-auth/react";

import User from "@/models/User";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  if (req.method !== "GET")
    return res
      .status(400)
      .json({ ok: false, message: "MUST be a GET request" });

  const isConnected = await connectDB();
  if (!isConnected)
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });

  const data = await getSession({ req });
  const user = await User.findOne({ email: data.user.email });
  if (!user)
    return res.status(401).json({ ok: false, message: "Please login first" });

  const { email, firstName, lastName } = user;
  res
    .status(200)
    .json({
      ok: true,
      data: { email, firstName: firstName || "", lastName: lastName || "" },
    });
}
