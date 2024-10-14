import { client } from "@/lib/contentful/client";
import {
  IFaq,
  IFaqFields,
  IFeature,
  IFeatureFields,
  IPackage,
  IPackageFields,
  IPricingCopy,
  IPricingCopyFields,
} from "@/lib/contentful/contentful";
import QuestionsList from "./components/feature/QuestionsList";
import FeaturesList from "./components/feature/FeaturesList";
import PackagesList from "@/components/feature/PackagesList";

export default async function Pricing() {
  const featuresData = (
    await client.getEntries({
      content_type: "feature",
    })
  ).items as IFeature[];

  const features = (
    featuresData.map((feature) => feature.fields) as IFeatureFields[]
  ).sort((a, b) => a.order - b.order);

  const packagesData = (
    await client.getEntries({
      content_type: "package",
    })
  ).items as IPackage[];

  const packages = (
    packagesData.map((pkg) => pkg.fields) as IPackageFields[]
  ).sort((a, b) => a.price - b.price);

  const faqData = (
    await client.getEntries({
      content_type: "faq",
    })
  ).items as IFaq[];

  const faqs = faqData.map((faq) => faq.fields) as IFaqFields[];

  const copyData = (await client.getEntry(
    "1RJ8WsuVAfrmufJZhibtyx"
  )) as IPricingCopy;

  const copy = copyData.fields as IPricingCopyFields;

  return (
    <div className="padding-container">
      <div className="content-container">
        <section className="pt-[220px] xl:pt-[260px]">
          <h1 className="w-full text-center uppercase leading-none">
            Join Kick & Bass
          </h1>
        </section>

        <section className="section section--small--margin">
          <PackagesList />
        </section>

        <section className="section section--medium--margin">
          <div className="flex flex-col items-center w-full gap-12 lg:gap-16">
            <p className="text-neutral-400 fluid-text--base">
              Plans can be changed or cancelled at any time
            </p>

            <FeaturesList
              features={features}
              packages={packages.map((pkg) => ({
                title: pkg.title,
                color: pkg.color,
                features: pkg.features,
              }))}
            />
          </div>
        </section>

        <section id="faq" className="section section--medium--margin">
          <div className="flex flex-col lg:flex-row w-full lg:mt-36 gap-16 lg:gap-0 lg:justify-between">
            <div className="flex flex-col gap-4 xl:gap-6 items-start">
              <h2 className="flex flex-col leading-none fluid-text--2xl uppercase w-9/12">
                {copy.faqHeader || "Frequently Asked Questions"}
              </h2>

              <a
                href="mailto:hello@kick-bass.com?subject=Kick & Bass Inquiry:"
                className="px-5 py-3 rounded-full border-[3px] border-neutral-50 polysans-median fluid-text--sm hover:bg-neutral-50 hover:text-neutral-950 transition-color duration-300"
              >
                Get In Touch
              </a>
            </div>

            <QuestionsList faqs={faqs} />
          </div>
        </section>
      </div>
    </div>
  );
}
