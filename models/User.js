import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    minLength: 4,
  },
  password: {
    type: String,
    minLength: 4,
  },
  firstName: String,
  lastName: String,
  todos: {
    todo: [{ todoId: String, title: String }],
    inProgress: [{ todoId: String, title: String }],
    review: [{ todoId: String, title: String }],
    done: [{ todoId: String, title: String }],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
