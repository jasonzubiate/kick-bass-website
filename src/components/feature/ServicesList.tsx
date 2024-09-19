import { client } from "@/lib/contentful/client";
import ServiceCard from "../ui/ServiceCard";
import { IService, IServiceFields } from "@/lib/contentful/contentful";

export default async function ServicesList() {
  const servicesData = (
    await client.getEntries({
      content_type: "service",
    })
  ).items as IService[];

  const services = servicesData.map(
    (service) => service.fields
  ) as IServiceFields[];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {services
        .sort((a, b) => a.order - b.order)
        .map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            sticker={service.sticker.fields.file?.url as string}
            video={
              service.video
                ? (service.video.fields.file?.url as string)
                : undefined
            }
            color={service.color}
            details={service.detailsList}
          />
        ))}
    </ul>
  );
}
