import { client } from "@/lib/contentful/client";
import { ICoach, ICoachFields } from "@/lib/contentful/contentful";
import CoachesCarousel from "./CoachesCarousel";

export default async function CoachesList() {
  const coachesData = (
    await client.getEntries({
      content_type: "coach",
    })
  ).items as ICoach[];

  const coaches = coachesData.map((coach) => coach.fields) as ICoachFields[];

  return <CoachesCarousel coaches={coaches} />;
}
