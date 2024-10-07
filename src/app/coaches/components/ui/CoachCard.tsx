import { TbArrowUpRight } from "react-icons/tb";
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
      href={`/coaches/${slug}`}
      className={`relative w-full h-full flex justify-center items-end p-3 lg:p-4 rounded-2xl 2xl:rounded-[20px] overflow-hidden ${category === "Guest" ? "pointer-events-none" : ""} `}
    >
      <Image
        src={`https:${image.fields.file?.url as string}` || ""}
        alt={(image.fields.title as string) || "coach"}
        fill
        className="object-cover object-center absolute inset-0 z-0"
      />

      {category !== "Guest" && (
        <div className="flex items-center justify-center p-2 absolute top-3 right-3 rounded-full bg-white z-10">
          <TbArrowUpRight className="text-neutral-950 text-2xl" />
        </div>
      )}

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
