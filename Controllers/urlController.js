import url from "../Models/urlModel.js";
import { generate } from "shortid";
import route from "../Routes/urlRoute.js";

//post request
export const addURL = async (req , res) => {
     const URL =  req.body.url;
     if(!URL)
        return res.status(400).json({message:`invalid url` , success:false});
     const shortID = generate();
     const result = await url.create({
       shortID : shortID,
        reDirect : URL,
        visit : [],
     })
     return res.status(201).json({message:`${shortID} added` , success:true});
}
//get request
export const redirectURL = async (req , res) => {
      const id = req.params.id;
      if(!id)
        return res.status(400).json({message:`Enter short id` , success:false})
    try {
        const result = await url.findOne({shortID:id});
        if(result==null)
         return res.status(400).json({messgae:`${id} did not found` , success:false})
         const currentTime = Date.now();
         await url.updateOne(
           { shortID: id },
           { $push: { visit: { time: currentTime } } }
         );
     
         console.log("Redirecting to:", result.reDirect);
         return res.redirect(result.reDirect);
    } catch (error) {
         return res.status(500).json({message:"Internal error" , success:false})
    }
}
//Get Analytics 
export const analytics = async (req , res) => {
       const id = req.params.id;
       if(!id)
        return res.status(400).json({
      message:`Enter short id`,
      success:false,
     })
     try {
        const result = await url.findOne({shortID:id});
        if(result==null)
         return res.status(400).json({messgae:`${id} did not found` , success:false})
        return res.status(200).json({data:{
            totalClicks:result.visit.length,
             data:result.visit,
        } , success:true});
     } catch (error) {
        return res.status(500).json({message:"Internal error" , success:false})
     }
}