import { Package } from '@/payload-types';
import PackageCard from '../ui/PackageCard';

export default function PackagesList({ packages }: { packages: Package[] }) {
  return (
    <ul className="flex flex-col lg:flex-row w-full gap-8 lg:gap-[2vw]">
      {packages.map(({ name, price, description, link, extras, color, id }) => (
        <li key={id} className="w-full">
          <PackageCard
            name={name}
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
