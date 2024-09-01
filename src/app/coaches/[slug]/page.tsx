import { client } from "@/lib/contentful/client";
import { ICoach, ICoachFields } from "@/lib/contentful/contentful";
import Image from "next/image";
import { notFound } from "next/navigation";

import { FaSpotify, FaInstagram, FaTiktok, FaGlobe } from "react-icons/fa6";

const iconMapping = {
  spotify: FaSpotify,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  null: FaGlobe,
};

const getPlatform = (url: string) => {
  if (url === "Spotify") return "spotify";
  if (url === "Instagram") return "instagram";
  if (url === "TikTok") return "tiktok";
  return "null";
};

type Label = {
  link: string;
  name: string;
};

type Social = {
  link: string;
  name: string;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const coachData = (
    await client.getEntries({
      content_type: "coach",
      "fields.slug": params.slug,
      limit: 1,
    })
  ).items[0] as ICoach;

  const coach = coachData.fields as ICoachFields;

  if (coach.category === "Guest") notFound();

  return (
    <div className="padding-container">
      <div className="content-container">
        <div className="flex flex-col lg:flex-row pt-36 lg:pb-6 mb-16 gap-8 2xl:gap-[2vw]">
          {
            <div className="relative w-full h-[600px] sm:h-screen lg:w-5/12 2xl:w-4/12 lg:h-[74vw] max-h-[900px]">
              <Image
                src={`https:${coach.image.fields.file?.url as string}`}
                alt={coach.image.fields.title as string}
                fill
                className="object-cover object-center rounded-lg lg:rounded-xl"
              />
            </div>
          }

          <div className="flex flex-col w-full lg:w-7/12 2xl:w-6/12 gap-6 lg:gap-8">
            <div className="flex flex-col gap-4">
              <h1 id="coach__name" className="h2--lg polysans-median uppercase">
                {coach.title}
              </h1>
              {coach.socials && (
                <ul className="flex gap-4">
                  {coach.socials.map((social: Social) => {
                    const platform = getPlatform(social.name);
                    const IconComponent = iconMapping[platform];
                    return (
                      IconComponent && (
                        <a
                          key={social.link}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white hover:bg-demoSmoke transition-colors duration-300 rounded-full p-2 2xl:p-2.5 "
                        >
                          <IconComponent
                            className="w-6 h-6 2xl:w-7 2xl:h-7 text-neutral-950"
                            aria-label={platform}
                          />
                        </a>
                      )
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h5>Coach Bio</h5>

              {coach.bio && (
                <p
                  className="text-neutral-400 w-full 2xl:w-10/12 fluid-text--sm"
                  dangerouslySetInnerHTML={{
                    __html: coach.bio.replace(/\n/g, "<br />"),
                  }}
                />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h5>Releases On</h5>
              <p className="whitespace-nowrap text-neutral-400 fluid-text--sm">
                {coach.labels &&
                  coach.labels
                    .map((label: Label) => (
                      <a key={label.link} href={label.link}>
                        {label.name}
                      </a>
                    ))
                    .reduce((prev: any, curr: any) => [prev, ", ", curr])}
              </p>
            </div>

            {coach.spotifyUrl && (
              <div className="flex flex-col gap-2">
                <h5>Popular Tracks</h5>
                <iframe
                  src={coach.spotifyUrl}
                  height={"200px"}
                  className="w-full 2xl:w-8/12 mb-[-50px] rounded-lg lg:rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
