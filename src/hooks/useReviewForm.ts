"use client";

import { useState, useCallback, Dispatch, SetStateAction } from "react";

type FormData = {
  image: File | null;
  author: string;
  joined: string;
  rating: number;
  review: string;
};

type FormErrors = {
  image: boolean;
  author: boolean;
  joined: boolean;
  review: boolean;
};

export function useReviewForm(toggleModal: Dispatch<SetStateAction<boolean>>) {
  const [formData, setFormData] = useState<FormData>({
    image: null,
    author: "",
    joined: "",
    rating: 0,
    review: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    image: false,
    author: false,
    joined: false,
    review: false,
  });

  const [submitting, setSubmitting] = useState(false);

  const validateForm = useCallback((data: FormData): FormErrors => {
    return {
      image: data.image === null,
      author: data.author.length < 1,
      joined: data.joined.length < 1,
      review: data.review.length < 1,
    };
  }, []);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setFormData((prev) => ({
          ...prev,
          image: file,
        }));
        setErrors((prev) => ({ ...prev, image: false }));
      }
    },
    []
  );

  const handleSubmit = async () => {
    const formErrors = validateForm(formData);
    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
      return;
    }

    const newFormData = new FormData();
    newFormData.append("image", formData.image as Blob);
    newFormData.append("author", formData.author);
    newFormData.append("joined", formData.joined);
    newFormData.append("rating", formData.rating.toString());
    newFormData.append("review", formData.review);

    try {
      setSubmitting(true);

      const response = await fetch("/api/review", {
        method: "POST",
        body: newFormData,
      });

      if (response.ok) {
        toggleModal(false);
        setSubmitting(false);
        setFormData({
          image: null,
          author: "",
          joined: "",
          rating: 0,
          review: "",
        });
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return {
    formData,
    errors,
    submitting,
    setFormData,
    handleImageUpload,
    handleSubmit,
  };
}
