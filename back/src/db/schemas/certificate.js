import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
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
