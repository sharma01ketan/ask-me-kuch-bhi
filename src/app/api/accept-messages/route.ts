import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import {User} from 'next-auth'
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";

export async function POST(request: Request){
  await dbConnect()
  const session = await getServerSession(authOptions)
  const user: User = session?.user as User
  if(!session || !session.user){
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = user._id
  const {acceptMessages} = await request.json()

  try {
    const updateUser = await UserModel.findByIdAndUpdate(userId,
      {isAcceptingMessages: acceptMessages},
      {new: true}
    )
    if(!updateUser){
      return Response.json(
        {
          success: false,
          message: 'Unable to find user to update message acceptance status',
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: 'Message acceptance status updated successfully',
        updateUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error updating message acceptance status' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request){
  console.log(request)
  await dbConnect()
  const session = await getServerSession(authOptions)
  const user: User = session?.user as User

    if(!session || !session.user){
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  const userId = user._id

  try {
    const foundUser = await UserModel.findById(userId)
    if (!foundUser) {
      // User not found
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error retrieving message acceptance status:', error);
    return Response.json(
      { success: false, message: 'Error retrieving message acceptance status' },
      { status: 500 }
    );
  }
}