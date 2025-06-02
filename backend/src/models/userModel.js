import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        image: { type: String, default: "" },
        bio: { type: String, default: "" },

        Otp:{type:String, required: false},
        OtpExpireAt: { type: Number, default: 0 },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
