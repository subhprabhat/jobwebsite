import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register Company 
export const registerCompany = async(req,res)=>{
    try{
       const {name} = req.body; 
       if(!name){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        });
       }
       let company = await Company.findOne({name:name});
       if(company){
        return res.status(400).json({
            message:"you can't register same company",
            success:false
        })
       };
      company = await Company.create({
        name:name,
        userId:req.id, //-> ye maine comment kiya hai 
        success:true
     })

     return res.status(201).json({
        message:"company registered successfully",
        company,
        success:true
     })

    }catch(error){
        console.log(error);
    }
}


// Get company -> get list of all company
export const getCompany = async(req,res)=>{
    try{
         const userId = req.id;
         const companies = await Company.find({userId}); //ye original line hai 
        //  const companies = await Company.find({}); // isme userid ko hataya gya hai taaki saaare company find ho sake - this line is important
         if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success:false
            })
         }
         return res.status(200).json({
            companies,
            success:true
         })
    }catch(error){
        console.log(error);
    };
}


// Get company by Id -> to get any specific company 
export const getCompanyById = async (req,res) => {
    try{
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if(!company){
        return res.status(404).json({
            message:"company not found",
            success:false
        })
      }
      return res.status(200).json({
        company,
        success:true
      })
    }catch(error){
        console.log(error);
    }
}


// Update company -> to update the information of the company 
export const updateCompany = async(req,res)=>{
    try{
        const {name,description,website,location} = req.body;
   
        const file = req.file;
        // idher cloudinary aayega
       const fileUri = getDataUri(file);
       const cloudResponse = await cloudinary.uploader.upload(fileUri.content )
       const logo = cloudResponse.secure_url;

        const updateData = {name,description,website,location,logo};

        const company = await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});

        if(!company){
            res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"company information updated",
            success:true
        })
    }catch(error){
        console.log(error);
    }
}


