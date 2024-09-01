import { client } from "@/lib/contentful/client";
import CoachesListOne from "./CoachesListOne";
import CoachesListTwo from "./CoachesListTwo";
import CoachesListFour from "./CoachesListFour";
import { ICoach, ICoachFields } from "@/lib/contentful/contentful";

export default async function CoachesList() {
  const coachesData = (
    await client.getEntries({
      content_type: "coach",
    })
  ).items as ICoach[];

  const coaches = coachesData.map((coach) => coach.fields) as ICoachFields[];

  coaches.sort((a, b) => {
    const categoryOrder = {
      Head: 0,
      Main: 1,
      Guest: 2,
    };

    return categoryOrder[a.category] - categoryOrder[b.category];
  });

  return (
    <>
      <CoachesListOne coaches={coaches} />
      <CoachesListTwo coaches={coaches} />
      <CoachesListFour coaches={coaches} />
    </>
  );
}
