import { client } from "@/lib/contentful/client";
import CoachesListOne from "./CoachesListOne";
import CoachesListTwo from "./CoachesListTwo";
import CoachesListFour from "./CoachesListFour";

export default async function CoachesList() {
  const coaches = (
    await client.getEntries({ content_type: "coach" })
  ).items.map((item) => item.fields);

  return (
    <>
      <CoachesListOne coaches={coaches.toReversed()} />
      <CoachesListTwo coaches={coaches.toReversed()} />
      <CoachesListFour coaches={coaches.toReversed()} />
    </>
  );
}
