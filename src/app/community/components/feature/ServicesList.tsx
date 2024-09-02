import ServiceCard from '../ui/ServiceCard';

type ServicesListProps = {
  services: {
    title: string;
    description: string;
    features: string[];
    color: string;
    image: string;
  }[];
}

export default function ServicesList({services}: ServicesListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12 lg:mb-24">
      {services.map((service, index) => (
        <li key={index} className="w-full h-[clamp(400px,30vw,600px)]">
          <ServiceCard
            title={service.title}
            description={service.description}
            features={service.features}
            color={service.color}
            index={index}
            image={service.image}
          />
        </li>
      ))}
    </ul>
  );
}
