import mongoose from "mongoose";
import { User } from "./models/User";
import { Certificate } from "./models/Certificate";
import { Award } from "./models/Award";
import { Education } from "./models/Education";
import { Project } from "./models/Project";

const DB_URL = process.env.MONGODB_URL;

mongoose.connect(DB_URL);
const db = mongoose.connection;

db.on("connected", () =>
  console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL)
);
db.on("error", (error) =>
  console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error)
);

export { User };
export { Certificate };
export { Award };
export { Education };
export { Project };
