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

  const mainCoaches = coaches
    .filter((coach) => coach.category === "Main" || coach.category === "Head")
    .sort((a, b) => a.order - b.order);
  const guestCoaches = coaches
    .filter((coach) => coach.category === "Guest")
    .sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="mb-16 lg:mb-20">
        <div className="flex items-center gap-1.5 text-white mb-6 lg:mb-12">
          <div className={`kick-bass-square bg-white animate-pulse`} />
          <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">
            Main Coaches
          </h2>
        </div>

        <CoachesListOne coaches={mainCoaches} />
        <CoachesListTwo coaches={mainCoaches} marginTop="12vw" />
        <CoachesListFour coaches={mainCoaches} marginTop="4vw" />
      </div>

      <div className="mb-16 lg:mb-20">
        <div className="flex items-center gap-1.5 text-white mb-6 lg:mb-12">
          <div className={`kick-bass-square bg-white animate-pulse`} />
          <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base">
            Guest Appearances
          </h2>
        </div>

        <CoachesListOne coaches={guestCoaches} />
        <CoachesListTwo coaches={guestCoaches} marginTop="30vw" />
        <CoachesListFour coaches={guestCoaches} marginTop="11vw" />
      </div>
    </div>
  );
}
