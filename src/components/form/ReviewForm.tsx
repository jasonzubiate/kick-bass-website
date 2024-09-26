"use client";
import { TbStar, TbStarFilled } from "react-icons/tb";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TbPhotoCirclePlus } from "react-icons/tb";
import { useReviewForm } from "@/hooks/useReviewForm";

interface ReviewFormProps {
  toggleModal: Dispatch<SetStateAction<boolean>>;
}

export default function ReviewForm({ toggleModal }: ReviewFormProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    formData,
    setFormData,
    errors,
    submitting,
    handleImageUpload,
    handleSubmit,
  } = useReviewForm(toggleModal);

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

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

      <div
        ref={modalRef}
        className="w-[95%] lg:w-[800px] flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
      >
        <div className="py-2 px-4 lg:px-5 bg-neutral-900 bg-opacity-40 backdrop-blur-sm flex rounded-t-xl relative items-center">
          <button
            className="w-3.5 h-3.5 lg:w-4 lg:h-4 bg-appleRed rounded-full absolute"
            onClick={() => toggleModal(false)}
          ></button>
          <label
            htmlFor="contact-modal"
            className="uppercase text-xs lg:text-sm tracking-wide mx-auto"
          >
            Review
          </label>
        </div>

        <div className="flex flex-col gap-8 p-4 lg:p-6 bg-neutral-900 rounded-b-xl">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="polysans-neutral-mono text-xs lg:text-sm">
                kick-bass.com
              </p>
              <p className="polysans-neutral-mono text-xs lg:text-sm">
                ©{new Date().getFullYear()}
              </p>
            </div>

            <p className="polysans-neutral-mono text-xs lg:text-sm">
              Hey there. To submit a review of Kick & Bass, drop your name, the
              year you joined, and a short review below. Cheers.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div
                className={`relative min-w-12 min-h-12 rounded-full flex justify-center items-center overflow-hidden border cursor-pointer transition-colors duration-300 ${errors.image ? "border-hardLime" : "border-neutral-600"}`}
              >
                <label
                  htmlFor="review_image"
                  aria-label="Review Image"
                  className={`z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-950 pointer-events-none ${
                    !formData.image ? "bg-opacity-0" : "bg-opacity-60"
                  }`}
                >
                  <TbPhotoCirclePlus className="w-4 h-4 text-white" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 w-full h-full"
                  onChange={(e) => handleImageUpload(e)}
                  required
                />
                {formData.image && (
                  <Image
                    src={URL.createObjectURL(formData.image)}
                    alt="product image"
                    fill
                    className="pointer-events-none object-cover object-center"
                  />
                )}
              </div>

              <input
                type="text"
                value={formData.author}
                placeholder="Your name"
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className={`outline-none ring-0 bg-transparent w-full text-white placeholder:text-white text-xs lg:text-sm border rounded-full px-5 h-12 polysans-neutral-mono transition-colors duration-300 ${errors.author ? "border-hardLime" : "border-neutral-600"}`}
              />

              <input
                type="text"
                value={formData.joined}
                placeholder="Year joined"
                onChange={(e) =>
                  setFormData({ ...formData, joined: e.target.value })
                }
                className={`hidden lg:inline outline-none ring-0 bg-transparent w-8/12 lg:w-full text-white placeholder:text-white text-xs lg:text-sm border rounded-full px-5 h-12 polysans-neutral-mono transition-colors duration-300 ${errors.joined ? "border-hardLime" : "border-neutral-600"}`}
              />

              <div className="hidden lg:flex justify-between items-center w-full border border-neutral-600 rounded-full px-5 h-12">
                <p className="text-white text-xs lg:text-sm polysans-neutral-mono">
                  Rating
                </p>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= formData.rating ? (
                      <TbStarFilled
                        key={star}
                        className="text-hardLime cursor-pointer"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      />
                    ) : (
                      <TbStar
                        key={star}
                        className="text-hardLime cursor-pointer"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 lg:hidden">
              <input
                type="text"
                value={formData.joined}
                placeholder="Year joined"
                onChange={(e) =>
                  setFormData({ ...formData, joined: e.target.value })
                }
                className={`outline-none ring-0 bg-transparent w-5/12 text-white placeholder:text-white text-xs lg:text-sm border rounded-full px-5 h-12 polysans-neutral-mono transition-colors duration-300 ${errors.joined ? "border-hardLime" : "border-neutral-600"}`}
              />

              <div className="flex justify-between items-center w-7/12 border border-neutral-600 rounded-full px-5 h-12">
                <p className="text-white text-xs lg:text-sm polysans-neutral-mono">
                  Rating
                </p>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= formData.rating ? (
                      <TbStarFilled
                        key={star}
                        className="text-hardLime cursor-pointer"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      />
                    ) : (
                      <TbStar
                        key={star}
                        className="text-hardLime cursor-pointer"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                      />
                    )
                  )}
                </div>
              </div>
            </div>

            <textarea
              value={formData.review}
              placeholder="Your review"
              onChange={(e) =>
                setFormData({ ...formData, review: e.target.value })
              }
              className={`outline-none ring-0 bg-transparent w-full h-72 text-white placeholder:text-white text-xs lg:text-sm resize-none border rounded-xl px-5 py-3 polysans-neutral-mono transition-colors duration-300 ${errors.review ? "border-hardLime" : "border-neutral-600"}`}
            />
          </form>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-4 py-2 text-neutral-950 bg-white hover:bg-neutral-100 rounded-full transition-colors duration-300 uppercase text-xs lg:text-sm ml-auto"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
