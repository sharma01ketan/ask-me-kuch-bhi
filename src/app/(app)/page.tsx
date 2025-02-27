"use client";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React from "react";
import { Integrations } from "@/components/Integrations";
import FeatureCards from "@/components/landing-page/Features";
import HowItWorks from "@/components/landing-page/HowItWorks";

export default function Home() {
  return (
    <>
      <section id="hero" className="bg-neutral-900 pt-16 w-full relative pb-8">
        <div className="container px-5 mx-auto mt-10 md:mb-40">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:space-x-12">
            <div className="lg:w-1/2 animate__animated animate__fadeInLeft">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Have Questions?</span>
                <span className="block text-indigo-500">Ask me anything</span>
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl min-w-fit sm:mx-auto md:mt-5 md:text-xl lg:mx-0 whitespace-pre-wrap">
                Share your thoughts freely and securely. Our platform ensures
                complete anonymity while sending messages to anyone.
              </p>
              <div className="mt-8 sm:mt-12">
                <a
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2 animate__animated animate__fadeInRight">
              <div className="bg-neutral-800 rounded-lg md:p-8 p-6 shadow-xl">
                <Carousel
                  plugins={[Autoplay({ delay: 2000 })]}
                  className="w-[80%]"
                >
                  <CarouselContent>
                    {messages.map((message, index) => (
                      <CarouselItem key={index} className="p-4">
                        <Card className="bg-neutral-700 md:p-4  rounded-lg border border-neutral-700 text-gray-200 ">
                          <CardHeader className="p-4 md:pt-4 md:pb-4 pb-1">
                            <CardTitle className="text-gray-200 mr-auto">
                              {" "}
                              <span className="md:inline-block hidden">
                                Message from
                              </span>{" "}
                              {message.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                            <Mail className="flex-shrink-0 md:block hidden" />
                            <div className=" flex flex-col">
                              <p className="text-gray-100 pl-0 text-left">
                                {message.content}
                              </p>
                              <p className="text-xs text-muted-foreground text-gray-300 pl-0 text-left">
                                {message.received}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="bg-indigo-600 p-4 rounded-lg ml-4">
                  <p className="text-gray-200 font-bold text-left text-lg">
                    Response
                  </p>
                  <p className="text-white mt-2 text-left">
                    Thank you so much! Really appreciate the feedback! 🙌
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-neutral-900 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Ask Me Kuch Bhi - Where your identity remains a secret.
          </p>
        </section>
      </main>
      {/* Footer */}
      <section className="bg-neutral-900">
        <div className="container bg-neutral-900">
          <FeatureCards />
        </div>
        <div className="container bg-neutral-900">
          <HowItWorks />
        </div>
      </section>
      <footer className="text-center p-4 md:p-6 bg-neutral-900 text-white">
        © 2025 Ask Me Kuch Bhi. All rights reserved by sharma01ketan.
      </footer>
    </>
  );
}
