import User from "../Models/userModel.js"
import bcrypt from 'bcrypt'
const saltRounds = 10;
import jwt from 'jsonwebtoken';


export const addUser = async(req,res)=>{


    const hashedPassword = await bcrypt.hash(req.body.password,saltRounds)
   try {
     let userItem = {
         name : req.body.name,
         username : req.body.username,
         email : req.body.email,
         password : hashedPassword,
         createdAt: new Date()
     }
 
     
     let user = new User(userItem)  //creating model so we can edit and manage datat
 
     await user.save()
     
     res.status(200).send(user)
 
   } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error'})
   }
}


export const login = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message:"User not found"})

        }

        const isValid = await bcrypt.compare(password,user.password)

        if(!isValid) {
            return res.status(401).json({message:'Invalid credent'})
        }

        const secret_key = process.env.JWT_SECRET_KEY

        let payload = {user: email}

        let token = jwt.sign(payload, secret_key)


        res.status(200).json({message:'Login successful',token:token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}






export const getUsers = async (req,res)=>{
    try {
       const users = await User.find({});
       if(!users){
        res.status(404).json({error: 'Users not found'})
       }
       res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

export const getUserByUsername = async (req,res)=>{
    try {
       const user = await User.findOne({username: req.params.username});
       if(!user){
        res.status(404).json({error: 'User not found'})
       }
       res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

export const updateUserbyID = async (req,res)=>{
    try {
       const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
       if(!user){
        res.status(404).json({error: 'User not found'})
       }
       res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}

export const deleteUserbyID = async (req,res)=>{
    try {
       const user = await User.findByIdAndDelete(req.params.id);
       if(!user){
        res.status(404).json({error: 'User not found'})
       }
       res.status(200).json({message:'User deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'})
    }
}







