import Image from "next/image";
import Link from "next/link";

type CoachCardProps = {
  title: string;
  slug: string;
  category: string;
  image: any;
};

export default function CoachCard({
  title,
  image,
  category,
  slug,
}: CoachCardProps) {
  const coachType = () => {
    if (category === "guest") return "Guest";
    if (category === "main") return "Coach";
    if (category === "head") return "Head Coach";
  };

  return (
    <Link
      href={`/coaches/${slug}`}
      className="relative w-full h-full flex justify-center items-end p-3 lg:p-4 rounded-2xl lg:rounded-[20px] 2xl:rounded-[24px] overflow-hidden"
    >
      {image && typeof image !== "number" && image.url ? (
        <Image
          src={image.url || ""}
          alt={image.alt || "coach"}
          layout="fill"
          className="object-cover object-center absolute inset-0 z-0"
          unoptimized
        />
      ) : null}

      <div className="relative z-10 flex items-center gap-2 lg:gap-3 py-2 pr-5 pl-2 bg-demoSmoke rounded-full">
        <h5 className="p--sm px-4 py-2 rounded-full bg-codGray text-hardLime whitespace-nowrap">
          {title}
        </h5>
        <p className="text-codGray whitespace-nowrap p--sm">{coachType()}</p>
      </div>
    </Link>
  );
}
