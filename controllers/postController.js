import Post from "../Models/postModel.js";
import path from 'path';
import fs from 'fs';

export const addPost = async (req,res) => {
    try {
       
        let postItem = {
            title: req.body.title,
            subtitle: req.body.subtitle,
            description: req.body.description,
            image: req.file.path
        }

        let post = new Post(postItem)
        await post.save()
        res.status(201).json(postItem)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}


export const getPosts = async(req,res)=>{
    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}


export const updatePost = async(req,res)=>{
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json(post)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}


export const deletePost = async(req,res)=>{
    try {
        const id = req.params.id
        const post = await Post.findByIdAndDelete(id)
        res.status(200).send(`Post titled "${post.title}" is deleted succeefully `)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}


export const getImageById = async(req,res)=>{
    try {
        const id = req.params.id
        const post = await Post.findById(id)
        if(!post) return res.status(404).json({error:"Image not found"})
        const imagePath =path.resolve('uploads',post.image);
        if(!fs.existsSync(imagePath)){
            return res.status(404).json({error:'image file not found'})
        }
        console.log(imagePath);
        res.sendFile(imagePath)
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
}


