import { NextResponse } from "next/server";
import { managementClient } from "@/lib/contentful/managementClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const author = formData.get("author") as string;
    const joined = formData.get("joined") as string;
    const review = formData.get("review") as string;

    if (!author || !joined || !review) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const space = await managementClient.getSpace(
      process.env.CONTENTFUL_SPACE_ID as string
    );
    const environment = await space.getEnvironment("master");

    // Prepare the entry fields without the image field
    const entryFields = {
      author: { "en-US": author },
      joined: { "en-US": joined },
      review: { "en-US": review },
      approved: { "en-US": false }, // Default to false until approved
    };

    // Create the entry with the prepared fields
    const entry = await environment.createEntry("testimonial", {
      fields: entryFields,
    });

    await entry.publish();

    return NextResponse.json(
      { message: "Review submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Error submitting review" },
      { status: 500 }
    );
  }
}
