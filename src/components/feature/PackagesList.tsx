import { client } from "@/lib/contentful/client";
import PackageCard from "../ui/PackageCard";
import { IPackage, IPackageFields } from "@/lib/contentful/contentful";

export default async function PackagesList() {
  const packagesData = (
    await client.getEntries({
      content_type: "package",
    })
  ).items as IPackage[];

  const packages = packagesData.map(
    (coach) => coach.fields
  ) as IPackageFields[];

  packages.sort((a, b) => a.price - b.price);

  return (
    <ul className="flex flex-col lg:flex-row w-full gap-8 lg:gap-[2vw]">
      {packages.map(({ title, price, description, link, extras, color }) => (
        <li key={title} className="w-full">
          <PackageCard
            name={title}
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
