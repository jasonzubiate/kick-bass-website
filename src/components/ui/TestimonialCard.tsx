import { TbStar, TbStarFilled } from "react-icons/tb";
import Image from "next/image";
import { ITestimonialFields } from "@/lib/contentful/contentful";

export default function TesitmonialCard({
  testimonial,
}: {
  testimonial: ITestimonialFields;
}) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const truncatedReviewText = truncateText(testimonial.review, 500);

  return (
    <div className="flex flex-col gap-8 2xl:gap-12 p-4 lg:p-6 2xl:p-8 w-[clamp(250px,22vw,400px)] rounded-2xl lg:rounded-[20px] 2xl:rounded-[24px] bg-neutral-900">
      <div className="flex flex-col gap-4">
        <p className="fluid-text--testimonial">
          &quot;{truncatedReviewText}&quot;
        </p>
        {
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= testimonial.stars ? (
                <TbStarFilled key={star} className="text-hardLime" />
              ) : (
                <TbStar key={star} className="text-hardLime" />
              )
            )}
          </div>
        }
      </div>

      <div className="flex gap-3 items-center">
        {testimonial.image?.fields?.file?.url ? (
          <div className="relative rounded-full h-10 w-10 xl:w-12 xl:h-12 overflow-hidden">
            <Image
              src={`https:${testimonial.image.fields.file.url as string}` || ""}
              alt={(testimonial.image.fields.title as string) || "Review image"}
              fill
              className="object-cover object-center"
            />
          </div>
        ) : null}

        <div className="flex flex-col">
          <p className="fluid-text--sm">{testimonial.author}</p>
          <p className="fluid-text--xs uppercase text-neutral-400 polysans-neutral-mono">
            Joined {testimonial.joined}
          </p>
        </div>
      </div>
    </div>
  );
}
