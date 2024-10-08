import { revalidatePath } from "next/cache";

export async function POST() {
  try {
    revalidatePath("/");
    revalidatePath("/coaches");
    revalidatePath("/tutorials");
    revalidatePath("/pricing");

    return Response.json({ status: 200, message: "Revalidation successful" });
  } catch (err) {
    return Response.json({ status: 500, error: "Error revaildating" });
  }
}
