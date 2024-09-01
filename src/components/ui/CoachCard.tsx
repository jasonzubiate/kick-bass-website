import { Asset } from "contentful";
import Image from "next/image";
import Link from "next/link";

type CoachCardProps = {
  name: string;
  image: Asset;
  type: string | null | undefined;
  slug: string | null | undefined;
};

export default function CoachCard({ name, image, type, slug }: CoachCardProps) {
  const coachType = () => {
    if (type === "Guest") return "Guest";
    if (type === "Main") return "Coach";
    if (type === "Head") return "Head Coach";
  };

  return (
    <Link
      href={`/coaches/${slug}`}
      className="relative w-full h-full flex justify-center items-end p-3 lg:p-4 rounded-2xl lg:rounded-[20px] 2xl:rounded-[24px] overflow-hidden"
    >
      {image.fields.file?.url ? (
        <Image
          src={(image.fields.file.url as string) || ""}
          alt={(image.fields.title as string) || "coach"}
          layout="fill"
          className="object-cover object-center absolute inset-0 z-0"
          unoptimized
        />
      ) : null}

      <div className="relative z-10 flex items-center gap-2 lg:gap-3 py-2 pr-5 pl-2 bg-neutral-50 rounded-full">
        <h5 className="p--sm px-4 py-2 rounded-full bg-neutral-950 text-hardLime whitespace-nowrap">
          {name}
        </h5>
        <p className="text-codGray whitespace-nowrap p--sm">{coachType()}</p>
      </div>
    </Link>
  );
}
