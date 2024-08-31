import { client } from "@/lib/contentful/client";
import TutorialsCarousel from "./components/feature/TutorialsCarousel";
import { TutorialsCopy } from "@/lib/contentful/types";

export default async function Page() {
  const tutorials = (
    await client.getEntries({ content_type: "tutorial" })
  ).items.map((item) => item.fields);

  const copy = (await client.getEntry("33NIWUpZeLcvMh1B1gXVsp"))
    .fields as TutorialsCopy;

  return (
    <div id="tutorials" className="flex flex-col gap-24 mt-36 mb-20">
      <div className="padding-container">
        <p className="fluid-text--base w-full lg:w-4/12 max-w-[700px]">
          {copy.paragraph ||
            "Watch weekly tech house tutorials, track breakdowns, and expert production techniques to elevate your house music production skills."}
        </p>
      </div>
      <div className="w-full flex justify-center">
        <TutorialsCarousel tutorials={tutorials} />
      </div>
    </div>
  );
}
