import { Schema, model } from "mongoose";

interface IUser {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string
}

export const UserSchema = new Schema<IUser>({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    role: {type: String}
});

const User = model("user", UserSchema);
export default User;
