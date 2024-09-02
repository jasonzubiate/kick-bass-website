"use client";

import { useState } from "react";
import ReviewForm from "../form/ReviewForm";

export default function ReviewModal() {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <div className="relative flex w-full justify-end">
      <button
        onClick={() => setToggleModal(!toggleModal)}
        className="px-5 py-3 rounded-full border-[3px] border-neutral-50 polysans-median fluid-text--sm hover:bg-neutral-50 hover:text-neutral-950 transition-color duration-300"
      >
        Write A Review
      </button>

      {toggleModal && (
        <ReviewForm
          toggleModal={setToggleModal}
        />
      )}
    </div>
  );
}
