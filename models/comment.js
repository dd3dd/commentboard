import mongoose, { Schema, models } from "mongoose";

const comment = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const Comment = models.Comment || mongoose.model("Comment", comment);
export default Comment;
