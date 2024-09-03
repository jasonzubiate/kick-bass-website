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

  const truncatedReviewText = truncateText(testimonial.review, 360);

  return (
    <div className="flex flex-col gap-24 rounded-2xl lg:rounded-[20px] 2xl:rounded-[24px] p-4 lg:p-6 2xl:p-8 bg-neutral-900 w-full">
      <p className="fluid-text--testimonial">
        &quot;{truncatedReviewText}&quot;
      </p>
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
