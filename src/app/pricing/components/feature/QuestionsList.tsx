"use client";
import { useState } from "react";
import { IFaqFields } from "@/lib/contentful/contentful";
import FAQCard from "../ui/FAQCard";

export default function QuestionsList({ faqs }: { faqs: IFaqFields[] }) {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const handleClick = (question: string) => {
    setOpenFAQ((prev) => (prev === question ? null : question));
  };

  return (
    <ul className="flex flex-col gap-4 w-full lg:w-1/2">
      {faqs.map(({ question, answer }) => (
        <FAQCard
          key={question}
          question={question}
          answer={answer}
          isOpen={question === openFAQ}
          onClick={() => handleClick(question)}
        />
      ))}
    </ul>
  );
}
