import { Schema, model } from "mongoose";

const URLschema = new Schema({
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  reDirect: {
    type: String,
    required: true,
  },
  visit:[{time:Number,}],
});

const url = model("url" , URLschema);

export default url;
