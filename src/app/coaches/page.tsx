import { client } from "@/lib/contentful/client";
import CoachesList from "./components/feature/CoachesList";
import { ICoachesCopyFields, ICoachesCopy } from "@/lib/contentful/contentful";

export default async function Coaches() {
  const copyData = (await client.getEntry(
    "5iM7z0gjMJlvFx2Gm2mQQf"
  )) as ICoachesCopy;

  const copy = copyData.fields as ICoachesCopyFields;

  return (
    <div className="padding-container">
      <div className="content-container">
        <h1 className="pt-[260px] uppercase flex flex-col gap-1 md:gap-2 leading-none">
          <span className="md:hidden">Coaches</span>
          <span className="w-full text-end md:hidden">That Know</span>
          <span className="md:hidden">
            Their sh<span className="text-hardLime">*</span>t
          </span>

          <span className="hidden md:flex">Coaches That</span>
          <span className="w-full justify-end text-content hidden md:flex">
            Know Their Sh<span className="text-hardLime">*</span>t
          </span>
        </h1>

        <section className="section section--small--margin">
          <CoachesList />
        </section>

        <section className="mt-8 md:-mt-[35vw] xl:-mt-[8vw] 2xl:mt-0 mb-24 lg:mb-48">
          <div className="section-header-group">
            <div className="flex items-center gap-1.5 text-white">
              <div className={`kick-bass-square bg-white animate-pulse`} />
              <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">
                {copy.header || "Join Today"}
              </h2>
            </div>
            <p className="w-full md:w-9/12 md:indent-60 2xl:indent-96 fluid-text--xl">
              {copy.paragraph ||
                "Enhance your productions with personalized feedback and one-on-one production coaching from the best tech house producers in the game. Join today and discover an artist-run community that’s dedicated to helping you take your music to a professional level."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
