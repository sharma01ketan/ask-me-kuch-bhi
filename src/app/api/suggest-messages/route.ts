import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
// export const runtime = 'edge'

const google = createGoogleGenerativeAI({
  baseURL: "http://localhost:3000/api/suggest-messages/",
  apiKey: process.env.GEMINI_API_KEY
});

const model = google('gemini-1.5-flash', {
  safetySettings: [
    { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_LOW_AND_ABOVE' },
  ],
});

export async function POST(request: Request){
  console.log(request)
  try {
    const result = streamText({
      model: model,
      prompt: `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What"s a hobby you"ve recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.`,
    });

  return result.toDataStreamResponse()
  } catch (error) {
    console.log("Error generating data: ",error)
    throw error
  }
}









//WITH DEEPSEEK HELP
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { streamText } from 'ai';

// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GEMINI_API_KEY
// });

// const model = google('gemini-1.5-flash', {
//   safetySettings: [
//     { category: 'HARM_CATEGORY_UNSPECIFIED', threshold: 'BLOCK_LOW_AND_ABOVE' },
//   ],
// });

// // Example processing function - modify this as needed
// function processTextChunk(chunk: string): string {
//   return chunk.toUpperCase(); // Your custom processing here
// }

// export async function POST(request: Request) {
//   console.log(request)
//   const result = streamText({
//     model,
//     prompt: 'Invent a new holiday and describe its traditions.',
//   });

//   // Create a transform stream to process text chunks
//   const processingStream = new TransformStream({
//     transform(chunk: string, controller) {
//       try {
//         const eventData = JSON.parse(chunk);

//         // Process text deltas while preserving other data types
//         if (eventData.type === 'text-delta') {
//           eventData.textDelta = processTextChunk(eventData.textDelta);
//         }

//         // Re-encode the modified data
//         controller.enqueue(JSON.stringify(eventData));
//       } catch (error) {
//         console.error('Error processing chunk:', error);
//       }
//     },
//   });

//   // Pipe the original stream through our processor
//   const processedStream = result.textStream.pipeThrough(processingStream);

//   // Create a custom response with the processed stream
//   return new Response(processedStream, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Transfer-Encoding': 'chunked',
//     },
//   });
// }




//PRE UPDATE

// import OpenAI from 'openai'
// import {OpenAIStream, StreamingTextResponse} from 'ai'

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY
// })

// export const runtime = 'edge'

// export async function POST(req: Request){
//   const {messages} = await req.json()
//   const response = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages
//   })
//   const stream = OpenAIStream(response)
//   return new StreamingTextResponse(stream)
// }
