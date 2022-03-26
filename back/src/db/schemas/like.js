import { Schema, model } from "mongoose";
const likeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});
const likeModel = model("Like", likeSchema);
export { likeModel };
