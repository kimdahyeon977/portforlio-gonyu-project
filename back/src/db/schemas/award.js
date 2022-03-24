import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },

);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };