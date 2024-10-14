"use server";

import { NextResponse } from "next/server";
import { managementClient } from "@/lib/contentful/managementClient";
import nodemailer from "nodemailer";

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hello@kick-bass.com",
    pass: "ntusjwfqfxbcqjsm",
  },
});

// Function to send email
async function sendEmail(subject: string, text: string) {
  const mailOptions = {
    from: "hello@kick-bass.com",
    to: "hello@kick-bass.com",
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

export async function POST(req: Request) {
  try {
    // Parse form data
    const formData = await req.formData();

    // Extract the form data fields
    const image = formData.get("image") as File | null; // Get the image as a File object
    const author = formData.get("author") as string;
    const joined = formData.get("joined") as string;
    const rating = formData.get("rating") as string;
    const review = formData.get("review") as string;

    // Ensure we have an image file
    if (image && typeof image === "object") {
      // Convert Blob (File) to ArrayBuffer and then to Buffer
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Get Contentful environment
      const space = await managementClient.getSpace(
        process.env.CONTENTFUL_SPACE_ID as string
      );
      const environment = await space.getEnvironment("master");

      // Upload the image to Contentful
      const upload = await environment.createUpload({ file: buffer });

      // Create the asset in Contentful
      let asset = await environment.createAsset({
        fields: {
          title: {
            "en-US": `Review image by ${author}`,
          },
          file: {
            "en-US": {
              contentType: image.type, // Image content type
              fileName: image.name, // Image file name
              uploadFrom: {
                sys: {
                  type: "Link",
                  linkType: "Upload",
                  id: upload.sys.id,
                },
              },
            },
          },
        },
      });

      // Process and publish the asset
      asset = await asset.processForAllLocales();
      asset = await asset.publish();

      // Create and publish the review entry with the image asset
      const entry = await environment.createEntry("testimonial", {
        fields: {
          author: { "en-US": author },
          joined: { "en-US": joined },
          rating: { "en-US": parseInt(rating) },
          review: { "en-US": review },
          image: {
            "en-US": {
              sys: { type: "Link", linkType: "Asset", id: asset.sys.id },
            },
          },
        },
      });

      await entry.publish();

      // Send email notification
      await sendEmail(
        "New Review Of Kick & Bass Submitted",
        `A new review has been submitted by ${author}.\nRating: ${rating}\nReview: ${review}`
      );

      // Return success response
      return NextResponse.json(
        { message: "Review submitted successfully" },
        { status: 200 }
      );
    } else {
      // If no image was uploaded, return an error
      console.error("No valid image file found");
      return NextResponse.json(
        { error: "No valid image file found" },
        { status: 400 }
      );
    }
  } catch (error) {
    // Log and return any errors that occurred during submission
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Error submitting review" },
      { status: 500 }
    );
  }
}
