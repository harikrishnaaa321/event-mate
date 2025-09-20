import mongoose from "mongoose";

const connectToDB=async()=>{
  await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected succesfully to database');
  }).catch((e)=>{
    console.log('cannt connect to Database',e.message);
  })
}
export default connectToDB;