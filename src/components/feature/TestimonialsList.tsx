import { client } from "@/lib/contentful/client";
import { ITestimonial, ITestimonialFields } from "@/lib/contentful/contentful";
import TestimonialCarousel from "./TestimonialsCarousel";

export default async function  TestimonialsList() {
  const testimonialsData = (
    await client.getEntries({
      content_type: "testimonial",
    })
  ).items as ITestimonial[];

  const testimonials = testimonialsData.map(
    (testimonial) => testimonial.fields
  ) as ITestimonialFields[];

  const approvedTestimonials = testimonials.filter(
    (testimonial) => testimonial.approved
  );

  return <TestimonialCarousel testimonials={approvedTestimonials} />;
}
