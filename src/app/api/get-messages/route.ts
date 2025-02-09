import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import {User} from 'next-auth'
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import mongoose from "mongoose";
export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const userId = new mongoose.Types.ObjectId(_user._id);

    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          messages: {
            $sortArray: {
              input: "$messages",
              sortBy: { createdAt: -1 },
            },
          },
        },
      },
    ]).exec();

    if (!user || user.length === 0) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Handle cases where messages might be undefined
    const messages = user[0].messages || [];
    return Response.json({ messages }, { status: 200 });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}