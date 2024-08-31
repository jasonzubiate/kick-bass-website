"use client";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import {
  TbArrowLeft,
  TbArrowRight,
  TbVolumeOff,
  TbVolume,
} from "react-icons/tb";

import { useCallback, useEffect, useRef, useState } from "react";
import { ITutorial, ITutorialFields } from "@/lib/contentful/contentful";

const TWEEN_FACTOR_BASE = 0.3;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export default function TutorialsCarousel({
  tutorials,
}: {
  tutorials: ITutorialFields[];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);
  const coachInfoNodes = useRef<HTMLElement[]>([]);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".slide__video") as HTMLElement;
    });
    coachInfoNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".coach-info") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;

          // Handle opacity of coach names
          const coachInfoNode = coachInfoNodes.current[slideIndex];
          if (tweenValue > 0.8) {
            coachInfoNode.style.opacity = "1";
          } else {
            coachInfoNode.style.opacity = "0";
          }
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenScale]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const currentSlide = emblaApi.selectedScrollSnap();
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === currentSlide) {
            video.muted = isMuted;
          } else {
            video.muted = true;
          }
        }
      });
    };

    emblaApi.on("select", onSelect);
    onSelect(); // Call once to set initial state

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, isMuted]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, tutorials.length);
  }, [tutorials]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);

    const currentSlide = emblaApi?.selectedScrollSnap();
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentSlide) {
          video.muted = newMutedState;
        } else {
          video.muted = true;
        }
      }
    });
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {tutorials.map(({ title, coach, video }, index) => (
            <div className="embla__slide" key={title}>
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.fields.file?.url as string}
                className="slide__video pointer-events-none"
                autoPlay
                muted
                loop
                controlsList="noremoteplayback nofullscreen"
                playsInline
                disablePictureInPicture
              />

              <div className="coach-info flex flex-col items-center gap-2 lg:gap-3 mt-6 transition-all duration-200">
                <h3 className="tutorial--name leading-snug text-center">
                  {title}
                </h3>
                <p className="text-grunge50 uppercase polysans-neutral-mono p--sm">
                  {coach.sys.id}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between w-10/12 xl:w-8/12 mx-auto mt-12 lg:mt-0">
        <button
          className="rounded-full border-2 border-neutral-50 p-2 md:p-2.5 hover:bg-neutral-50 hover:text-neutral-950 transition-colors duration-300"
          onClick={toggleMute}
        >
          {isMuted ? (
            <TbVolumeOff className="w-6 h-6 md:w-7 md:h-7" />
          ) : (
            <TbVolume className="w-6 h-6 md:w-7 md:h-7" />
          )}
        </button>
        <div className="embla__buttons">
          <button className="embla__prev" onClick={scrollPrev}>
            <TbArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button className="embla__next" onClick={scrollNext}>
            <TbArrowRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </section>
  );
}
