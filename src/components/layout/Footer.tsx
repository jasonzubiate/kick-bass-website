import { TbArrowUpRight } from "react-icons/tb";
import { FaInstagram, FaTiktok, FaYoutube, FaFacebook } from "react-icons/fa";

import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col m-4 lg:m-8 bg-hardLime text-neutral-950 rounded-2xl lg:rounded-[20px] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col lg:w-4/12">
            <div className="p-4 lg:p-6 2xl:p-8 border-b lg:border-r border-neutral-950">
              <img
                src="/icons/kick-bass-logo-black.png"
                alt="Kick & Bass"
                className="w-[clamp(120px,8vw,144px]) h-[clamp(44px,3vw,54px)]"
              />
            </div>

            <div className="p-4 lg:p-6 2xl:p-8 border-b lg:border-r lg:h-full border-neutral-950 lg:flex lg:items-center">
              <h2 className="fluid-text--footer-header">Level up your music</h2>
            </div>
          </div>

          <div className="flex flex-col items-start gap-8 lg:gap-16 p-4 lg:p-6 2xl:p-8 lg:w-8/12 border-b border-neutral-950">
            <div className="flex w-full justify-between">
              <img
                src="/icons/lines-black.png"
                alt="lines-black"
                className="h-4 w-auto"
              />
              <img
                src="/icons/lines-black.png"
                alt="lines-black"
                className="h-4 w-auto"
              />
              <img
                src="/icons/lines-black.png"
                alt="lines-black"
                className="h-4 w-auto hidden sm:flex"
              />
              <img
                src="/icons/lines-black.png"
                alt="lines-black"
                className="h-4 w-auto hidden 2xl:flex"
              />
              <img
                src="/icons/lines-black.png"
                alt="lines-black"
                className="h-4 w-auto hidden 2xl:flex"
              />
            </div>
            <div className="flex items-start flex-col gap-6">
              <p className="lg:w-9/12 max-w-[1000px] fluid-text--sm">
                Join our community of successful tech house producers who are
                passionate about helping you elevate your productions and master
                your craft.
              </p>
              <a
                href="https://www.launchpass.com/k-and-b-tech-house/k-and-b-tech-house/v3"
                className="flex items-center gap-2 2xl:gap-3 bg-neutral-950 text-white uppercase rounded-full pl-4 py-2 2xl:py-3 pr-2 2xl:pl-5 2xl:pr-3"
              >
                <span className="text-sm lg:text-base mt-0.5">Join Now</span>
                <div className="rounded-full bg-hardLime p-0.5 md:p-1">
                  <TbArrowUpRight className="h-6 w-6 text-neutral-950" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex w-full gap-4 lg:gap-6 p-4 lg:p-6 2xl:p-8 lg:w-4/12 border-b lg:border-b-0 lg:border-r border-neutral-950">
            <a
              href="https://www.instagram.com/kickbassofficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Page"
              className="p-3 bg-neutral-950 text-white text-lg rounded-full"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@kick_bass_official?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Page"
              className="p-3 bg-neutral-950 text-white text-lg rounded-full"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.youtube.com/channel/UC6VS8SkjHnIccw3WYjK6Q3A&ved=2ahUKEwj1t9ab5JyGAxUBmO4BHQn5BnYQFnoECBsQAQ&usg=AOvVaw1-oQ9KD7DVKcjgem2zBjQm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Page"
              className="p-3 bg-neutral-950 text-white text-lg rounded-full"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.facebook.com/Kickandbass909"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook Page"
              className="p-3 bg-neutral-950 text-white text-lg rounded-full"
            >
              <FaFacebook />
            </a>
          </div>
          <div className="flex items-start md:items-center w-full p-4 lg:p-6 2xl:p-8 lg:w-8/12 gap-8 lg:gap-0 md:justify-between">
            <div className="flex flex-col md:flex-row gap-4 lg:gap-8">
              <Link
                href="/coaches"
                className="fluid-text--testimonial footer-link"
              >
                Coaches
              </Link>
              <Link
                href="/tutorials"
                className="fluid-text--testimonial footer-link"
              >
                Tutorials
              </Link>
              <Link
                href="/pricing"
                className="fluid-text--testimonial footer-link"
              >
                Pricing
              </Link>
              <Link
                href="/pricing#faq"
                className="fluid-text--testimonial footer-link"
              >
                FAQs
              </Link>
              <a
                href="https://kick-bass.store/"
                className="fluid-text--testimonial footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop
              </a>
            </div>

            {/* <Link href="/contact" className="p">
              Contact
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
