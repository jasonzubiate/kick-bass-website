import { client } from "@/lib/contentful/client";
import { ITeamMember, ITeamMemberFields } from "@/lib/contentful/contentful";
import TeamMemberCard from "../ui/TeamMemberCard";

export default async function TeamMemberList() {
  const teamMemberData = (
    await client.getEntries({ content_type: "teamMember" })
  ).items as ITeamMember[];

  const teamMembers = teamMemberData.map(
    (member) => member.fields
  ) as ITeamMemberFields[];

  teamMembers.sort((a, b) => a.order - b.order);

  return (
    <ul className="flex flex-wrap items-start justify-center gap-2 md:gap-4 2xl:gap-6 w-full lg:w-7/12 mx-auto">
      {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.title}
          image={`https:${member?.image?.fields?.file?.url as string}`}
          name={member.title}
          role={member.role}
        />
      ))}
    </ul>
  );
}
