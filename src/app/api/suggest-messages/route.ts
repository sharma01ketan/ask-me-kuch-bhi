import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
}); // Safety settings are optional, you can add them back if needed.

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`;

    const response = await model.generateContentStream({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });

    const stream = GoogleGenerativeAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error: any) {
    console.error("Gemini API Error:", error); // More specific error logging

    if (error instanceof Error && error.message.includes("400")) {  // Check for 400 errors
      return new NextResponse(
        JSON.stringify({ error: "Bad Request. Check your prompt and parameters." }),
        { status: 400 }
      );
    }

    if (error?.response?.status) { // Check if it's a Gemini API error
        const { status, statusText } = error.response;
        return NextResponse.json({ error: statusText }, { status });
      }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}