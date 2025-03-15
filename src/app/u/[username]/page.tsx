"use client";

import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Ensure this path is correct or create the module if it doesn't exist
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const kapilSharmaMessageString =
  "What is the answer to life the universe and everything?||What's up brother?||Tell me a joke about AI?";

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const initMessage =
    username === "kapilSharma"
      ? kapilSharmaMessageString
      : initialMessageString;

  const [suggestedMessages, setSuggestedMessages] = useState(
    parseStringMessages(initMessage)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [qaPairs, setQaPairs] = useState<
    { question: string; answer: string }[]
  >([]);
  const [isQALoading, setIsQALoading] = useState(false);

  const qaContainerRef = useRef<HTMLDivElement>(null);
  const previousQALengthRef = useRef(qaPairs.length);
  const { data: session } = useSession(); // Add this line

  useEffect(() => {
    if (
      username === "kapilSharma" &&
      qaPairs.length > previousQALengthRef.current
    ) {
      // Smooth scroll to Q&A section when new answers are added
      setTimeout(() => {
        qaContainerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100); // Small delay to ensure DOM update
    }
    previousQALengthRef.current = qaPairs.length;
  }, [qaPairs, username]);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  useEffect(() => {
    if (username === "kapilSharma" || username === "kapilsharma") {
      fetchQAPairs();
    }
  }, [username]);

  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      if (username === "kapilSharma" || username === "kapilsharma") {
        // Handle kapilSharma's special case
        const response = await axios.post<{ answer: string }>(
          "/api/reply-messages",
          {
            question: data.content,
          }
        );
        console.log(response.data.answer);
        setQaPairs((prev) => [
          ...prev,
          { question: data.content, answer: response.data.answer },
        ]);

        toast({
          title: "Answer Generated!",
          description: "Check the Q&A section below",
          variant: "default",
        });
      } else {
        const response = await axios.post<ApiResponse>("/api/send-message", {
          ...data,
          username,
        });

        toast({
          title: response.data.message,
          variant: "default",
        });
      }

      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      // toast({
      //   title: "Error",
      //   description:
      //     axiosError.response?.data.message ?? "Failed to process request",
      //   variant: "destructive",
      // });
      console.log("ERROR" + JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggestLoading(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      if (response.status === 200) {
        const newMessages = parseStringMessages(response.data);
        setSuggestedMessages(newMessages);
      }
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch suggestions",
      //   variant: "destructive",
      // });
      console.log("ERROR" + JSON.stringify(error));
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const fetchQAPairs = async () => {
    setIsQALoading(true);
    try {
      const response = await axios.post<{
        qaPairs: { question: string; answer: string }[];
      }>("/api/reply-messages");
      setQaPairs(response.data.qaPairs);
      console.log(response.data.qaPairs);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch Q&A pairs",
      //   variant: "destructive",
      // });
      console.log("ERROR" + JSON.stringify(error));
    } finally {
      setIsQALoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {!session && (
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Want to receive anonymous messages? Create your own profile
          </Link>
        </div>
      )}
      <div className="container mx-auto my-8 bg-white rounded max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Send Message to @{username}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your anonymous message here"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>

        <Separator className="my-8" />

        <div className="space-y-4 my-8">
          <div className="space-y-2">
            <Button
              onClick={fetchSuggestedMessages}
              className="my-4"
              disabled={isSuggestLoading}
            >
              {isSuggestLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suggesting...
                </>
              ) : (
                "Generate AI Suggestions"
              )}
            </Button>
            <p className="text-muted-foreground">
              Click any suggestion to select it
            </p>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">Suggested Messages</h3>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {suggestedMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="mb-2 text-left h-auto whitespace-normal"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {(username === "kapilSharma" || username === "kapilsharma") && (
          <div className="mt-8" ref={qaContainerRef}>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Q&A Section</h3>
              </CardHeader>
              <CardContent>
                {isQALoading ? (
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <Accordion type="multiple" className="w-full">
                    {qaPairs &&
                      qaPairs.map((qa, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {qa.question}
                          </AccordionTrigger>
                          <AccordionContent className="whitespace-pre-wrap">
                            {qa.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
