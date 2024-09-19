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

  return (
    <ul className="flex gap-4 w-full xl:w-8/12 justify-center xl:justify-end flex-wrap mt-16 xl:mt-0">
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
