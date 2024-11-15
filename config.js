import {connect} from "mongoose";

const connectDB = async (URL) => {
      return await connect(URL);
}

export default connectDB;