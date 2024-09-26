import Image from "next/image";
import { client } from "@/lib/contentful/client";
import Hero from "@/components/page/Hero";
import { IHomeCopy, IHomeCopyFields } from "@/lib/contentful/contentful";
import PackagesList from "@/components/feature/PackagesList";
import SectionHeader from "@/components/layout/SectionHeader";
import CoachesList from "@/components/feature/CoachesList";
import TestimonialsList from "@/components/feature/TestimonialsList";
import ReviewModal from "@/components/modal/ReviewModal";
import ProductsList from "@/components/feature/ProductsList";
import { TbArrowUpRight } from "react-icons/tb";
import ServicesList from "@/components/feature/ServicesList";

export default async function Home() {
  const copyData = (await client.getEntry(
    "1TFelseHZMcmDnqQj87Cmh"
  )) as IHomeCopy;

  const copy = copyData.fields as IHomeCopyFields;

  return (
    <main>
      <div className="padding-container">
        <div className="content-container">
          <Hero />
        </div>
      </div>

      <section className="section--small--margin">
        <div className="padding-container">
          <div className="content-container">
            <PackagesList />
          </div>
        </div>
      </section>

      <section className="section section--medium--margin">
        <div className="padding-container">
          <div className="content-container">
            <div className="flex items-center gap-1.5 mb-12">
              <div className="kick-bass-square bg-neutral-50 animate-pulse" />
              <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">
                Our Services
              </h2>
            </div>

            <ServicesList />
          </div>
        </div>
      </section>

      <section className="section section--small--padding section--light rounded-[48px] md:rounded-[56px] lg:rounded-[64px]">
        <div className="flex flex-col">
          <SectionHeader
            header={copy.coachesHeader || "Our Coaches"}
            color="neutral-950"
          />

          <CoachesList />

          <div className="padding-container">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
              <div className="lg:w-5/12 2xl:w-4/12">
                <h4 className="polysans-median fluid-text--base mb-2 xl:mb-4">
                  {copy.coachesParagraphHeaderOne || "Head Coaches"}
                </h4>
                <p className="fluid-text--base text-neutral-500">
                  {copy.coachesParagraphBodyOne ||
                    "Our head coaches are industry leaders—touring DJs, chart-topping producers, and expert sound engineers. They bring real-world experience to your sessions, offering deep insights into House, Tech House, and Minimal House production. With their guidance, you’re learning from the best."}
                </p>
              </div>

              <div className="lg:w-5/12 2xl:w-4/12">
                <h4 className="polysans-median fluid-text--base mb-2 xl:mb-4">
                  {copy.coachesParagraphHeaderTwo || "Guest Appearances"}
                </h4>
                <p className="fluid-text--base text-neutral-500">
                  {copy.coachesParagraphBodyTwo ||
                    "Kick and Bass regularly hosts guest coaches from the top tiers of the industry. These professionals, including renowned artists and A&Rs, share unique perspectives and cutting-edge techniques, giving you fresh, insider knowledge in every session."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--medium--margin">
        <div className="padding-container">
          <SectionHeader
            header={copy.testimonialsHeaders || "Testimonials"}
            color="white"
          />
        </div>

        <TestimonialsList />

        <div className="padding-container mt-16">
          <ReviewModal />
        </div>
      </section>

      <section className="section section--medium--margin">
        <div className="padding-container">
          <SectionHeader header={copy.shopHeader || "Shop"} color="white" />
        </div>

        <ProductsList />
      </section>

      <section className="section section--medium--margin">
        <div className="padding-container">
          <div className="flex items-center justify-center gap-16">
            <div className="relative hidden lg:flex h-[200px] w-32">
              <Image
                src="/stickers/fresh-mix-lime.png"
                alt="kick-bass-img"
                fill
              />
            </div>

            <div className="flex flex-col">
              <h2 className="fluid-text--4xl uppercase text-center mb-4">
                {copy.emailListingHeader || "Want A Sneak Peek?"}
              </h2>
              <div className="flex flex-col items-center gap-6 lg:flex-row">
                <form className="flex justify-between rounded-full bg-white pl-5 py-3 pr-3 w-full md:w-[350px]">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="text-lg xl:text-xl w-full text-neutral-950 placeholder:text-neutral-400 outline-none ring-0 bg-transparent"
                  />

                  <button
                    type="submit"
                    aria-label="Submit Email Address"
                    className="p-2 text-2xl lg:text-3xl text-hardLime bg-neutral-950 rounded-full"
                  >
                    <TbArrowUpRight />
                  </button>
                </form>

                <p className="text-hardLime text-center">
                  {copy.emailListingDescription ||
                    "Sign up for our newsletter and receive a special gift!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
