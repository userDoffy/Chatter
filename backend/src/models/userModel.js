import mongoose from "mongoose";
import { genSalt } from "bcrypt";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, default: "" },
        bio: { type: String, default: "" },

        Otp:{type:String, required: false},
        OtpExpireAt: { type: Number, default: 0 },
        isVerfied: { type: Boolean, default: false },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const salt = await genSalt();
    this.password =  await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model("User", userSchema);
