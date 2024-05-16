import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema({
    name: String,
    age: Number,
    rank: String,

  });

  const Employee = mongoose.model('Employee', employeeSchema); //can pass 3rd parameter to pass exact collection name
  // Employee.collection.createIndex({name:1},{unique:true})
  
  export default Employee