import { client } from "@/lib/contentful/client";
import TutorialsCarousel from "./components/feature/TutorialsCarousel";
import {
  ITutorial,
  ITutorialFields,
  ITutorialsCopy,
  ITutorialsCopyFields,
} from "@/lib/contentful/contentful";

export default async function Page() {
  const tutorials = (await client.getEntries({ content_type: "tutorial" }))
    .items as ITutorial[];

  const items = tutorials.map(
    (tutorial) => tutorial.fields
  ) as ITutorialFields[];

  const copy = (await client.getEntry(
    "33NIWUpZeLcvMh1B1gXVsp"
  )) as ITutorialsCopy;

  const data = copy.fields as ITutorialsCopyFields;

  return (
    <div id="tutorials" className="flex flex-col gap-24 pt-36 mb-20">
      <div className="padding-container">
        <p className="fluid-text--base w-full lg:w-4/12 max-w-[700px]">
          {data.paragraph ||
            "Watch weekly tech house tutorials, track breakdowns, and expert production techniques to elevate your house music production skills."}
        </p>
      </div>
      <div className="w-full flex justify-center">
        <TutorialsCarousel tutorials={items} />
      </div>
    </div>
  );
}
