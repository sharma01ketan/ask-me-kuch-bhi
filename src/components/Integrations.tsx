import { useRef, useState } from "react";
// import { Description } from "@headlessui/react/dist/components/description/description";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Slider from "react-slick";
import { BackgroundBeams } from "./ui/aurora-background";
// import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
// import { CustomPill } from "../ui/pill";

export const Integrations = () => {
  const { resolvedTheme } = useTheme();

  const CARDS_LIST = [
    {
      title: "Jira",
      description:
        "Jira Cloud. Jira Server. Jira Whatever. Just move to Plane in a few clicks. Facts.",
      icon: "https://images.plane.so/imports/integrations/jira-dark.svg",
      img: "https://images.plane.so/imports/integrations/jira-light.webp",
      img_dark: "https://images.plane.so/imports/integrations/jira-dark.webp",
      video: "https://images.plane.so/imports/integrations/jira.webm",
    },
    {
      title: "Linear",
      description:
        "Bring all your data in Linear over to Plane and experience the exponential with less-their-opinion-more-your flexibility.",
      icon: "https://images.plane.so/imports/integrations/linear-dark.svg",
      img: "https://images.plane.so/imports/integrations/linear-light.webp",
      img_dark: "https://images.plane.so/imports/integrations/linear-dark.webp",
      video: "https://images.plane.so/imports/integrations/linear.webm",
    },
    {
      title: "Asana",
      description:
        "Don’t lose any of your data when you lose that uncomfortable asana for a totally flexible work pose.",
      icon: "https://images.plane.so/imports/integrations/asana.svg",
      img: "https://images.plane.so/imports/integrations/asana-light.webp",
      img_dark: "https://images.plane.so/imports/integrations/asana-dark.webp",
      video: "https://images.plane.so/imports/integrations/asana.webm",
    },
  ];

  const customSlider = useRef<Slider>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [playVideos, setPlayVideos] = useState<boolean[]>(
    new Array(CARDS_LIST.length).fill(false)
  ); // Array to track play state for each slide
  // slider settings
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    className: "center",
    centerPadding: "150px",
    centerMode: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
    beforeChange: (oldIndex: number, newIndex: number) => {
      setPlayVideos((prevState) => prevState.map(() => false));
      setCurrentSlide(newIndex);
    },
  };

  const toggleVideo = (index: number) => {
    setPlayVideos((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  return (
    <div className="mx-auto h-450px bg-neutral-900">
      <div className="flex flex-col items-center gap-y-5 h-fit">
        <div className="container mx-auto h-fit  relative">
          <div className="relative z-10 mt-4 h-fit">
            <Slider {...settings} ref={customSlider} className="flex h-fit">
              {CARDS_LIST.map((card, index) => (
                <div
                  key={index}
                  className={`rounded-3xl bg-neutral-900 flex flex-col items-center justify-center transition-all duration-300 ${
                    index === currentSlide ? "scale-100" : "scale-75"
                  }`}
                >
                  <div className="relative rounded-3xl bg h-fit overflow-hidden ">
                    {/* <BackgroundBeams>{"THIS IS A Video"}</BackgroundBeams> */}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <button
            type="button"
            className="size-10 grid place-items-center rounded-full absolute left-0 top-0 z-10 h-full sm:w-[40px] md:w-[100px]"
            onClick={() => customSlider.current?.slickPrev()}
          />
          <button
            type="button"
            className="size-10 grid place-items-center rounded-full absolute right-0 top-0 z-10 h-full sm:w-[40px] md:w-[100px]"
            onClick={() => customSlider.current?.slickNext()}
          />
        </div>
      </div>
    </div>
  );
};
