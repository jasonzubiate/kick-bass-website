"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { TbPhotoCirclePlus } from "react-icons/tb";

interface ReviewFormProps {
  toggleModal: Dispatch<SetStateAction<boolean>>;
}

export default function ReviewForm({ toggleModal }: ReviewFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleModal(false);
      }
    };

    if (modalRef) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleModal]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/review", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      toggleModal(false);
    } else {
      console.error(response.statusText);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

      <div
        ref={modalRef}
        className="w-4/5 lg:w-[650px] flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <div className="py-2 px-4 lg:px-5 bg-neutral-600 bg-opacity-40 backdrop-blur-md flex rounded-t-xl relative items-center">
          <button
            className="w-3.5 h-3.5 bg-appleRed rounded-full absolute"
            onClick={() => toggleModal(false)}
          ></button>
          <label
            htmlFor="contact-modal"
            className="uppercase text-sm lg:text-base tracking-wide mx-auto"
          >
            Review
          </label>
        </div>

        <div className="flex flex-col p-4 lg:p-5 bg-neutral-900 rounded-b-xl">
          <p className="polysans-neutral-mono mb-6 lg:mb-8 text-sm lg:text-base">
            Hey there. To submit a review of Kick & Bass please fill out the
            form below. Thank you.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center"
            encType="multipart/form-data"
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg flex justify-center items-center overflow-hidden bg-neutral-800">
              <label
                htmlFor="review_image"
                aria-label="Review Image"
                className={`z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-full bg-opacity-90 pointer-events-none ${
                  !imageUrl ? "bg-neutral-950" : "bg-white"
                }`}
              >
                <TbPhotoCirclePlus
                  size={16}
                  className={`transition-colors duration-200 ${
                    !imageUrl ? "text-white" : "text-neutral-950"
                  }`}
                />
              </label>
              <input
                type="file"
                accept="image/*"
                name="image"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                onChange={(e) => handleImageUpload(e)}
              />
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="product image"
                  fill
                  objectFit="cover"
                  objectPosition="center"
                  className="pointer-events-none"
                />
              )}
            </div>

            <div className="flex flex-col rounded-lg bg-neutral-800 p-3 lg:p-4 gap-1 w-full">
              <label
                htmlFor="name"
                aria-label="Review Name"
                className="text-xs xl:text-sm uppercase tracking-wide text-neutral-500 polysans-neutral-mono"
              >
                Name
              </label>
              <input
                type="text"
                name="author"
                id="author"
                className="outline-none ring-0 bg-transparent w-full text-white p--sm"
                autoFocus
              />
            </div>

            <div className="flex flex-col rounded-lg bg-neutral-800 p-3 lg:p-4 gap-1 w-full">
              <label
                htmlFor="name"
                aria-label="Review Year Joined"
                className="text-xs xl:text-sm uppercase text-neutral-500 polysans-neutral-mono"
              >
                Year Joined
              </label>
              <input
                type="text"
                name="joined"
                id="joined"
                className="outline-none ring-0 bg-transparent w-full text-white p--sm"
              />
            </div>

            <div className="flex flex-col rounded-lg bg-neutral-800 p-3 lg:p-4 gap-1 w-full">
              <label
                htmlFor="name"
                aria-label="Review"
                className="text-xs xl:text-sm uppercase text-neutral-500 polysans-neutral-mono"
              >
                Review
              </label>
              <textarea
                name="review"
                id="review"
                className="outline-none ring-0 bg-transparent w-full text-white p--sm h-36 resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-white text-neutral-950 rounded-full hover:bg-neutral-50 transition-colors duration-200 uppercase tex-sm ml-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
