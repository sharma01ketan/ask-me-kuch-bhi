import mongoose  from "mongoose";


//db ke connection ke baad mein jo object aa rha hai uska data type kya hai
//TODO: learn more about this connection method
type ConnectionObject = {
  isConnected?:  number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
  //if this if condition is not done, database choking can be a condition because multiple connections are allowed
  if(connection.isConnected){
    console.log("Already connected to datbase")
    return 
  }
  try{
    const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
    connection.isConnected = db.connections[0].readyState
    console.log("DB connected fully")
  }catch (error){
    console.log("DB connection failed",error)
    process.exit(1)
  }
}

export default dbConnect