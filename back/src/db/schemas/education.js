import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    school: {
      // 학교 이름
      type: String,
      required: true,
    },
    major: {
      // 전공
      type: String,
      required: true,
    },
    position: {
      //재학중, 휴학중, 졸업, 졸업예정 등을 나타냄
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    graduationDate: {
      //position에 따라 달라지니 필수 값이 아닐 수 있다.
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
