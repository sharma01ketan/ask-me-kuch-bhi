import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import {User} from 'next-auth'
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import mongoose from "mongoose";

export async function GET(request: Request){
  console.log(request)
  await dbConnect()
  const session = await getServerSession(authOptions)
  const user: User = session?.user as User
  if(!session || !session.user){
    return Response.json(
      {
        success: false,
        message: "Not Authenticated"
      },
      {
        status: 401
      }
    )
  }
  //MONGODB AGGREGATION PIPELINE
  const userId = new mongoose.Types.ObjectId(user._id)
  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          messages: { $ifNull: ["$messages", []] } // Ensure messages is always an array
        }
      },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$messages" }
        }
      }
    ]).exec();

    if(!user || user.length == 0){
    return Response.json(
      {
        success: false,
        message: "User not found"
      },
      {
        status: 401
      }
    )
    }
    return Response.json(
      {
        success: true,
        messages: user[0].messages
      },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log("An unexpected error occured: ",error)
      return Response.json(
        {
          success: false,
          message: "Not Authenticated"
        },
        {
          status: 500
        }
      )
  }
}