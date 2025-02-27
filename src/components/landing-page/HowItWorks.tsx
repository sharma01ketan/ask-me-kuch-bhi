import { Link as LinkIcon, Share2, MessageSquare } from "lucide-react";
import Link from "next/link";
const steps = [
  {
    id: 1,
    title: "Create Link",
    description: "Generate your unique anonymous message link in one click",
    icon: <LinkIcon className="w-10 h-10 text-indigo-500" />,
  },
  {
    id: 2,
    title: "Share Link",
    description:
      "Share your link on social media or send it directly to friends",
    icon: <Share2 className="w-10 h-10 text-indigo-500" />,
  },
  {
    id: 3,
    title: "Receive Messages",
    description: "Get anonymous messages from anyone who visits your link",
    icon: <MessageSquare className="w-10 h-10 text-indigo-500" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-neutral-900 text-white py-16 px-4 md:px-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
        <p className="text-gray-400 mt-2">
          Send anonymous messages in three simple steps
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center bg-neutral-900 ">
        {steps.map(({ id, title, description, icon }) => (
          <div
            key={id}
            className="relative bg-neutral-800 p-6 rounded-lg w-full max-w-sm flex flex-col items-center text-center shadow-md"
          >
            <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-neutral-950 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">
              {id}
            </span>
            <div className="mb-4">{icon}</div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-400 mt-2">{description}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/sign-in">
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition-all">
          Get Your Link Now →
        </button>
        </Link>
      </div>
    </section>
  );
}
