import Image from "next/image";

type TeamMemberCardProps = {
  image: string;
  name: string;
  role: string;
};

export default function TeamMemberCard({
  image,
  name,
  role,
}: TeamMemberCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-neutral-900 p-4">
      <div className="rounded-full w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 relative overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col">
        <p className="fluid-text--sm tracking-wider">{name}</p>
        <p className="fluid-text--xs text-neutral-500 uppercase polysans-neutral-mono">
          {role}
        </p>
      </div>
    </div>
  );
}
