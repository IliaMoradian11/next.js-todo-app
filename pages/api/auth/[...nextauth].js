import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import User from "@/models/User";
import { comparePasswords } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        if (email?.length < 4 || password?.length < 4) {
          throw new Error("Invalid email or password");
        }

        const isConnected = await connectDB();
        if (!isConnected) throw new Error("Internal server error");

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("There isn't any user with this email");
        }

        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
          throw new Error("Incorrect username or password");
        }

        return { email };
      },
    }),
  ],
};

export default NextAuth(authOptions);
