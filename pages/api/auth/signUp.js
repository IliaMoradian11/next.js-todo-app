import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

export default async function handler(req, res) {
  const isConnected = await connectDB();
  if (!isConnected)
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });

  try {
    const { email, password } = req.body;
    if (email?.length < 4 || password?.length < 4)
      return res
        .status(422)
        .json({ ok: false, message: "Invalid email or password" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(422).json({
        ok: false,
        message: "There is an existing user with this email",
      });
    const hashedPassword = await hashPassword(password);
    await User.create({ email, password: hashedPassword });

    return res.status(201).json({ ok: true, message: "User created" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
}
