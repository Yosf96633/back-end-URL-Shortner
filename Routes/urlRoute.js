import {Router} from "express"
import {addURL , analytics, redirectURL} from "../Controllers/urlController.js"
const route = Router();

route.get("/:id" , redirectURL)
route.post("/" , addURL);
route.get("/analytics/:id" , analytics);


export default route;