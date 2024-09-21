import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="h-screen flex items-center pt-32 lg:pt-[10vw] 2xl:pt-[7vw]">
      <div className="flex flex-col gap-16 lg:gap-24 w-full">
        <h1 className="fluid-text--h1-lg polysans-median">
          <div className="flex items-center w-full">
            <div>
              <span>L</span>
              <span>e</span>
              <span className="backflip">v</span>
              <span>e</span>
              <span>l</span>
              <span> </span>
              <span>u</span>
              <span className="bounce">p</span>
            </div>

            <div className="relative w-14 h-14 sm:w-16 sm:h-16 z-0 left-[6vw] md:left-[1vw] md:w-[clamp(110px,23vw,360px)] md:h-[clamp(90px,9vw,160px)]">
              <Image
                src={"/stickers/vinyl-hand-lime.png"}
                alt="Fresh Mix"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>

          <div className="flex justify-end items-center w-full">
            <div className="hidden md:flex *:relative w-[clamp(80px,13vw,220px)] h-[clamp(70px,10vw,160px)] rotate-6 mr-[6%] z-0">
              <Image
                src={"/stickers/wet-danceflor.png"}
                alt="Fresh Mix"
                fill
                className="object-contain object-center"
              />
            </div>

            <div className="whitespace-nowrap">
              <span>y</span>
              <span>o</span>
              <span>u</span>
              <span>r</span>
              <span> </span>
              <span>m</span>
              <span>u</span>
              <span className="spin">s</span>
              <span>i</span>
              <span>c</span>
            </div>
          </div>
        </h1>

        <div className="flex flex-col md:flex-row gap-32 lg:gap-0 w-full justify-between items-start md:items-center">
          <div className="flex items-start md:items-center gap-1.5 text-white">
            <div className="w-2 lg:w-3 h-4 lg:h-5 bg-white animate-pulse" />
            <h2 className="offbit-101-bold uppercase tracking-wide fluid-text--base max-w-[300px] md:max-w-none leading-[110%]">
              With Mentorship From Professionals
            </h2>
          </div>

          <Link
            href="/pricing"
            className="px-10 py-3 rounded-full w-full md:w-auto text-center border-[3px] border-hardLime polysans-median fluid-text--hero-cta hover:bg-hardLime hover:text-neutral-950 transition-color duration-300"
          >
            View plans
          </Link>
        </div>
      </div>
    </div>
  );
}
