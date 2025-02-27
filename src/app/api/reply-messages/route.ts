import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { question } = await req.json();
    
    if (question) {
      // Handle Q&A generation for kapilSharma
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const qaPrompt = `
        You are The famous Indian comedian Kapil Sharma I will ask you veery generic questions you are going to reply with extremely funny answers to them even if there is no direct funny answer, make them funny by interjecting something relevant no matter what i ask you, and NO MATTER WHAT IN WHATEVER CONDITIONS you have to keep the answers family friendly, and answer in hinglish
        As Kapil Sharma, answer this question in Hinglish in a funny, family-friendly way: 
        "${question}"
        Keep the response under 3 sentences and include emojis where appropriate.
      `;

      const result = await model.generateContent(qaPrompt);
      const response = result.response;
      
      return NextResponse.json({
        answer: response.text()
      });
    }

    // Handle regular suggestions
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const suggestionPrompt = `
      Generate 5 generic icebreaker questions separated by "||" characters.
      These should be questions people might ask a celebrity in anonymous messages.
      Examples: "What's your hidden talent?||What's your favorite comfort food?"
    `;

    const result = await model.generateContent(suggestionPrompt);
    const response = await result.response;
    
    return new Response(
      response.text().replace(/\n/g, '||'), // Ensure proper formatting
      { headers: { 'Content-Type': 'text/plain' } }
    );

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}