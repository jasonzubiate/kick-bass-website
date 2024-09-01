import { Asset } from "contentful";
import Image from "next/image";
import Link from "next/link";

type CoachCardProps = {
  title: string;
  image: Asset;
  category: string;
  slug: string | null;
};

export default function CoachCard({
  title,
  image,
  category,
  slug,
}: CoachCardProps) {
  const coachType = () => {
    if (category === "Guest") return "Guest";
    if (category === "Main") return "Coach";
    if (category === "Head") return "Head Coach";
  };

  return (
    <Link
      href={category !== "Guest" ? `/coaches/${slug}` : "/coaches"}
      className="relative w-full h-full flex justify-center items-end p-3 lg:p-4 rounded-2xl lg:rounded-[20px] 2xl:rounded-[24px] overflow-hidden"
    >
      <Image
        src={`https:${image.fields.file?.url as string}` || ""}
        alt={(image.fields.title as string) || "coach"}
        layout="fill"
        className="object-cover object-center absolute inset-0 z-0"
      />

      <div className="relative z-10 flex items-center gap-2 lg:gap-3 py-2 pr-5 pl-2 bg-neutral-50 rounded-full">
        <h5 className="p--sm px-4 py-2 rounded-full bg-neutral-950 text-hardLime whitespace-nowrap">
          {title}
        </h5>
        <p className="text-neutral-950 whitespace-nowrap p--sm">
          {coachType()}
        </p>
      </div>
    </Link>
  );
}
