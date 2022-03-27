import { Schema, model } from "mongoose";
const id = require("./types/id.js");
const CertificateSchema = new Schema(
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
    whenDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
