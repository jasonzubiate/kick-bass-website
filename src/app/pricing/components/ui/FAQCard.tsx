"use client";
import { gsap } from "gsap";
import { TbArrowUpRight } from "react-icons/tb";
import { useLayoutEffect, useRef } from "react";

type FAQCardProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};

export default function FAQCard({
  question,
  answer,
  isOpen,
  onClick,
}: FAQCardProps) {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (isOpen) {
      gsap.to(buttonRef.current, { rotation: 180, duration: 0.2 });
      gsap.to(contentRef.current, { height: "auto", duration: 0.3 });
    } else {
      gsap.to(buttonRef.current, { rotation: 0, duration: 0.2 });
      gsap.to(contentRef.current, { height: 0, duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <li onClick={onClick} className="faq__card">
      <div className="flex justify-between items-center gap-4">
        <h3 className="faq__question text-base xl:text-lg">{question}</h3>
        <button ref={buttonRef} className="faq__button">
          <TbArrowUpRight className="faq__button__icon" />
        </button>
      </div>
      <p
        ref={contentRef}
        className="text-base h-0 text-neutral-500 leading-relaxed"
      >
        <br />
        {answer}
      </p>
    </li>
  );
}
