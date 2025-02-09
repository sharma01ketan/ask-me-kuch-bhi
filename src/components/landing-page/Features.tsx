import { Lock, Send, Shield, Clock, Zap, BarChart } from "lucide-react";

const features = [
  {
    title: "Complete Anonymity",
    description:
      "No registration required. Send messages without revealing your identity. Your privacy is our top priority.",
    icon: <Lock className="w-6 h-6" />,
  },
  {
    title: "Instant Delivery",
    description:
      "Messages are delivered instantly. No delays, no waiting. Real-time communication at your fingertips.",
    icon: <Send className="w-6 h-6" />,
  },
  {
    title: "End-to-End Encryption",
    description:
      "Your messages are encrypted and secure. Only the intended recipient can read your messages.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Message Expiry",
    description:
      "Set automatic message expiry times. Your messages disappear when you want them to.",
    icon: <Clock className="w-6 h-6" />,
  },
  {
    title: "Quick Response",
    description:
      "Reply to anonymous messages instantly while maintaining anonymity. Keep the conversation flowing.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: "Custom Controls",
    description:
      "Manage who can send you messages. Block unwanted senders with just one click.",
    icon: <BarChart className="w-6 h-6" />,
  },
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-neutral-900 text-white ">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative bg-neutral-800 rounded-xl p-6 shadow-lg flex flex-col gap-3 transition-transform transform hover:scale-105"
        >
          <div className="absolute -top-4 left-4 bg-indigo-500 p-2 rounded-lg shadow-md">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold mt-6">{feature.title}</h3>
          <p className="text-gray-300 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
