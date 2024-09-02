import Image from "next/image";
import Link from "next/link";

type HomeServicesProps = {
  services: {
    title: string;
    description: string;
    image: string;
    color: string;
  }[];
};

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  color: string;
};

export default function HomeServices({ services }: HomeServicesProps) {
  return (
    <ul className="flex flex-col">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          image={service.image}
          color={service.color}
        />
      ))}
    </ul>
  );
}

const ServiceCard = ({
  title,
  description,
  image,
  color,
}: ServiceCardProps) => {
  return (
    <li className="flex flex-col md:flex-row md:items-center w-full border-b py-16 lg:py-20 border-text-neutral-500">
      <div className="w-full flex justify-center md:w-5/12 lg:w-4/12 mb-8 md:mb-0">
        <div className="relative w-[150px] h-[150px] md:w-[160px] md:h-[160px] lg:w-[210px] lg:h-[210px]">
          <Image src={image} alt={title} fill objectFit="contain" />
        </div>
      </div>

      <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col items-start">
        <h2 className="fluid-text--xl mb-12 lg:mb-16" style={{ color: color }}>
          {title}
        </h2>

        <p className="fluid-text--2xl leading-tight mb-10 lg:mb-12">
          {description}
        </p>

        <Link
          href={
            title.toLowerCase() !== "tutorials" ? "/community" : "/tutorials"
          }
          className="px-5 py-3 rounded-full border-[3px] border-neutral-50 polysans-median fluid-text--sm hover:bg-neutral-50 hover:text-neutral-950 transition-color duration-300"
        >{`Explore ${title === "Discord" ? title : title.toLocaleLowerCase()}`}</Link>
      </div>
    </li>
  );
};
