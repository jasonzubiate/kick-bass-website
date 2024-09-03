import { IPackageFields } from "@/lib/contentful/contentful";
import PackageCard from "../ui/PackageCard";

export default function PackagesList({
  packages,
}: {
  packages: IPackageFields[];
}) {
  return (
    <ul className="flex flex-col lg:flex-row w-full gap-8 lg:gap-[2vw]">
      {packages.map(({ title, price, description, link, extras, color }) => (
        <li key={title} className="w-full">
          <PackageCard
            title={title}
            price={price}
            description={description}
            extras={extras}
            link={link}
            color={color}
          />
        </li>
      ))}
    </ul>
  );
}
