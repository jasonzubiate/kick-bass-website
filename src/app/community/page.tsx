import Image from "next/image";
import { client } from "@/lib/contentful/client";
import {
  ICommunityCopy,
  ICommunityCopyFields,
} from "@/lib/contentful/contentful";
import SectionHeader from "@/components/layout/SectionHeader";
import ServicesList from "./components/feature/ServicesList";
import Globe from "./components/ui/Globe";
import TeamMemberList from "./components/feature/TeamMemberList";

export default async function Community() {
  const copyData = (await client.getEntry(
    "2WZ2pKL1QXNKqupTtjfQcV"
  )) as ICommunityCopy;

  const copy = copyData.fields as ICommunityCopyFields;

  const services = [
    {
      title: copy.serviceOneHeader,
      description: copy.serviceOneDescription,
      features: [
        "Production Talk",
        "Music Dsicovery",
        "DJ Mixes",
        "Discounts",
        "Private Lessons",
        "Emerging Music",
        "Collabs",
        "Meetups",
        "Diveaways",
        "Podcasts",
      ],
      color: "#6d77ff",
      image: "/stickers/slide-blue.png",
    },
    {
      title: copy.serviceTwoHeader,
      description: copy.serviceTwoDescription,
      features: [
        "Track Breakdowns",
        "Sound Design",
        "Tips & Tricks",
        "Ableton Racks",
        "Remixing",
        "Vocal Processing",
        "How To's",
        "Writing Tips",
        "Mixing & Mastering",
        "Arrangement",
      ],
      color: "#a6ff00",
      image: "/stickers/vinyl-hand-lime.png",
    },
    {
      title: copy.serviceThreeHeader,
      description: copy.serviceThreeDescription,
      features: [
        "Sound Design",
        "Mastering",
        "Arrangement",
        "Vocal Processing",
        "Writing Tips",
        "Tips & Tricks",
        "Ableton Racks",
        "Track Layering",
        "Remixing",
        "Ideation",
      ],
      color: "#ff007b",
      image: "/stickers/vinyl-pink.png",
    },
    {
      title: copy.serviceFourHeader,
      description: copy.serviceFourDescription,
      features: [
        "Track Feedback",
        "Social Marketing",
        "Creativity Workshops",
        "Music Theory",
        "Overcoming Blocks",
        "Guided Meditation",
        "Productivity",
        "Networking",
        "Collaborations",
      ],
      color: "#fff000",
      image: "/stickers/wet-danceflor.png",
    },
  ];

  return (
    <>
      <div className="padding-container">
        <div className="content-container">
          <h1 className="pt-[260px] flex flex-col uppercase leading-none">
            <span className="lg:hidden">Grow Your</span>
            <div className="hidden lg:flex justify-between">
              <span>Grow Your</span>
              <span>Skills</span>
            </div>

            <div className="flex justify-between lg:hidden">
              <div className="relative w-[clamp(48px,7vw,96px)] ml-[1vw] heart-beat">
                <Image
                  src="/icons/play.png"
                  alt="play"
                  fill
                  objectFit="contain"
                  priority
                />
              </div>

              <span>Skills</span>
            </div>

            <span className="lg:hidden">And Network</span>

            <div className="hidden lg:flex justify-between">
              <div className=" relative w-[clamp(48px,7vw,108px)] ml-[0.5vw] mb-[1vw] heart-beat">
                <Image
                  src="/icons/play.png"
                  alt="play"
                  fill
                  objectFit="contain"
                  priority
                />
              </div>

              <span className="lg:ml-auto">And Network</span>
            </div>
          </h1>
        </div>
      </div>

      <section className="section section--medium--margin">
        <div className="padding-container">
          <div className="content-container">
            <div className="section-header-group">
              <div className={`flex items-center gap-1.5`}>
                <div
                  className={`kick-bass-square bg-neutral-50 animate-pulse`}
                />
                <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">
                  {copy.introHeader || "Overview"}
                </h2>
              </div>
              <p className="fluid-text--xl w-full md:w-8/12 md:indent-60 2xl:indent-96">
                {copy.introParagraph ||
                  "We give aspiring producers the support and tools they need to master music production and build successful careers as main stage artists."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="section section--small--padding section--light rounded-[48px] md:rounded-[56px] lg:rounded-[64px]"
      >
        <div className="padding-container">
          <div className="flex flex-col">
            <SectionHeader
              header={copy.servicesHeader || "Perfect Your Craft"}
              color="neutral-950"
            />

            <ServicesList services={services} />

            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="w-full lg:w-4/12 lg:px-5 mb-8 lg:mb-0">
                <h4 className="polysans-median fluid-text--base mb-2 xl:mb-4">
                  {copy.extraOneHeader || "Rewards"}
                </h4>

                <p className="fluid-text--base text-neutral-500">
                  {copy.extraOneBody ||
                    "Regular community giveaways and discounts on private lessons,production tools, and Kick & Bass store items."}
                </p>
              </div>

              <div className="w-full lg:w-4/12 lg:px-5 mb-8 lg:mb-0">
                <h4 className="polysans-median fluid-text--base mb-2 xl:mb-4">
                  {copy.extraTwoHeader || "Inflyte List"}
                </h4>

                <p className="fluid-text--base text-neutral-500">
                  {copy.extraTwoBody ||
                    "Submit your music for a chance to be played by the biggest DJ's like John Summit, FISHER, Biscits, and more."}
                </p>
              </div>

              <div className="w-full lg:w-4/12 lg:px-5">
                <h4 className="polysans-median fluid-text--base mb-2 xl:mb-4">
                  {copy.extraThreeHeader || "Pro Coaching"}
                </h4>

                <p className="fluid-text--base text-neutral-500">
                  {copy.extraThreeBody ||
                    " Learn from active touring DJ's and producers that play at top festivals."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--medium--margin relative flex flex-col gap-16 lg:gap-36 mb-16 md:mb-24 lg:mb-48">
        <div className="padding-container">
          <div className="content-container">
            <div className="section-header-group">
              <div className={`flex items-center gap-1.5`}>
                <div
                  className={`kick-bass-square bg-neutral-50 animate-pulse`}
                />
                <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">
                  {copy.aboutHeader || "Meet The Team"}
                </h2>
              </div>
              <p className="fluid-text--xl w-full md:w-8/12 md:indent-60 2xl:indent-96">
                {copy.aboutDescription ||
                  "Kick & Bass is an artist-run community of professional tech house artists who are passionate about helping aspiring music producers build successful careers as touring artists."}
              </p>
            </div>
          </div>
        </div>
        <div className="padding-container">
          <div className="content-container">
            <div className="flex flex-col xl:flex-row lg:justify-between items-center relative">
              <div className="w-full xl:w-4/12 flex justify-center xl:justify-start">
                <Globe />
              </div>

              <TeamMemberList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
