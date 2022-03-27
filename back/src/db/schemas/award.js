import { Schema, model } from "mongoose";
const id = require("./types/id.js");
const AwardSchema = new Schema(
  {
    id,
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    admissionDate: {
      type: Date,
      required: false,
    },
  },
)


const AwardModel = model("Award", AwardSchema);

export { AwardModel };
