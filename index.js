import express from "express";
import connectDB from "./config.js";
import route from "./Routes/urlRoute.js";
const app = express();
const PORT = 8001
connectDB(
  `mongodb+srv://yosf96633:3gvCozvPIQbkZOfC@cluster0.fwfae.mongodb.net/url_shortner?retryWrites=true&w=majority`
)
  .then((data) => {
    console.log("Connect to Mongo DB");
  })
  .catch((error) => {
    console.log("Error during connecting");
  });
  app.use(express.urlencoded({extended:true}));
  app.use("/url" , route);
  app.get("/" , (req , res)=>{
    res.send("Hi from /")
  })




  app.listen(PORT , ()=>{
      console.log(`Run at http://localhost:${PORT}`);
  })