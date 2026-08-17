"use client";

import { useEffect, useState } from "react";

export default function TravelHero({ destinations }) {
  /*
   * ============================================================
   * CARD SETTINGS
   * ============================================================
   */

  const LARGE_WIDTH = 325;
  const LARGE_HEIGHT = 428;

  const SMALL_WIDTH = 280;
  const SMALL_HEIGHT = 373;

  const GAP = 18;

  /*
   * Fixed positions of the three visible cards.
   *
   * First card  : 0
   * Second card : 325 + 18 = 343
   * Third card  : 343 + 280 + 18 = 641
   */

  const POSITION_1 = 0;
  const POSITION_2 = LARGE_WIDTH + GAP;
  const POSITION_3 =
    LARGE_WIDTH + GAP + SMALL_WIDTH + GAP;

  /*
   * ============================================================
   * HERO
   * ============================================================
   */

  const [activeIndex, setActiveIndex] = useState(0);

  /*
   * Three visible cards.
   *
   * Initially:
   *
   * LARGE   = London
   * SMALL   = Singapore
   * SMALL   = Switzerland
   *
   * Hero = Everest
   */

  const [cards, setCards] = useState([
    destinations[1],
    destinations[2],
    destinations[3],
    destinations[4],
  ]);

  /*
   * animation
   */

  const [isAnimating, setIsAnimating] = useState(false);

  /*
   * ============================================================
   * AUTO ROTATION
   * ============================================================
   */

  useEffect(() => {
    const timer = setInterval(() => {
      moveNext();
    }, 6500);

    return () => clearInterval(timer);
  }, [cards, isAnimating]);

  /*
   * ============================================================
   * NEXT
   * ============================================================
   */

  const moveNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    /*
     * The first visible card becomes the hero.
     */

    const nextHero = cards[0];

    const nextHeroIndex = destinations.findIndex(
      (item) => item.id === nextHero.id
    );

    if (nextHeroIndex !== -1) {
      setActiveIndex(nextHeroIndex);
    }

    /*
     * After animation:
     *
     * London      -> Hero
     * Singapore   -> First card
     * Switzerland -> Second card
     * Cape Town   -> Third card
     */

    setTimeout(() => {
      setCards((current) => [
        current[1],
        current[2],
        current[3],
        current[0],
      ]);

      setIsAnimating(false);
    }, 700);
  };

  /*
   * ============================================================
   * CARD CLICK
   * ============================================================
   */

  const handleCardClick = (index) => {
    if (isAnimating) return;

    if (index === 0) {
      moveNext();
    }
  };

  /*
   * ============================================================
   * HERO
   * ============================================================
   */

  const hero = destinations[activeIndex];

  /*
   * ============================================================
   * CARD POSITION
   * ============================================================
   */

  const getCardStyle = (index) => {
    if (index === 0) {
      if (isAnimating) {
        return {
          left: "-343px",
          width: `${LARGE_WIDTH}px`,
          height: `${LARGE_HEIGHT}px`,
        };
      }

      return {
        left: `${POSITION_1}px`,
        width: `${LARGE_WIDTH}px`,
        height: `${LARGE_HEIGHT}px`,
      };
    }

    if (index === 1) {
      if (isAnimating) {
        return {
          left: `${POSITION_1}px`,
          width: `${LARGE_WIDTH}px`,
          height: `${LARGE_HEIGHT}px`,
        };
      }

      return {
        left: `${POSITION_2}px`,
        width: `${SMALL_WIDTH}px`,
        height: `${SMALL_HEIGHT}px`,
      };
    }

    if (index === 2) {
      if (isAnimating) {
        return {
          left: `${POSITION_2}px`,
          width: `${SMALL_WIDTH}px`,
          height: `${SMALL_HEIGHT}px`,
        };
      }

      return {
        left: `${POSITION_3}px`,
        width: `${SMALL_WIDTH}px`,
        height: `${SMALL_HEIGHT}px`,
      };
    }

    /*
     * Incoming fourth card.
     */

    if (isAnimating) {
      return {
        left: `${POSITION_3}px`,
        width: `${SMALL_WIDTH}px`,
        height: `${SMALL_HEIGHT}px`,
      };
    }

    return {
      left: `${POSITION_3 + SMALL_WIDTH + GAP}px`,
      width: `${SMALL_WIDTH}px`,
      height: `${SMALL_HEIGHT}px`,
    };
  };

  /*
   * ============================================================
   * UI
   * ============================================================
   */

  return (
    <section
      className="
        relative
        h-screen
        min-h-[700px]
        w-full
        overflow-hidden
      "
    >
      {/* ======================================================
          HERO IMAGE
      ======================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: `url(${hero.image})`,
        }}
      />

      {/* ======================================================
          SAME GREY OVERLAY
      ======================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-black/35
        "
      />

      {/* ======================================================
          NAVBAR
      ======================================================= */}

      <header
        className="
          absolute
          left-0
          right-0
          top-0
          z-30
          flex
          h-[120px]
          items-center
          px-6
          md:px-10
          lg:px-[6%]
        "
      >
        {/* LOGO */}

        <div
          className="
            flex
            items-center
            gap-3
            text-white
          "
        >
          <div
            className="
              relative
              h-10
              w-10
              overflow-hidden
              rounded-full
              border-2
              border-white
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-10
                w-[17px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white
              "
            />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                h-[15px]
                w-9
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-white
              "
            />

            <div
              className="
                absolute
                left-0
                right-0
                top-1/2
                h-px
                bg-white
              "
            />
          </div>

          <span
            className="
              text-2xl
              font-medium
              md:text-3xl
            "
          >
            Melissa
          </span>
        </div>

        {/* NAVIGATION */}

        <nav
          className="
            ml-auto
            mr-10
            hidden
            items-center
            gap-10
            lg:flex
          "
        >
          {[
            "Trips",
            "Events",
            "Countries",
            "Hotels",
            "Bookings",
          ].map((item, index) => (
            <a
              key={item}
              href="#"
              className={`
                relative
                py-3
                text-xl
                text-white
                xl:text-2xl

                ${
                  index === 0
                    ? `
                      after:absolute
                      after:bottom-0
                      after:left-0
                      after:right-0
                      after:h-[2px]
                      after:bg-lime-300
                    `
                    : ""
                }
              `}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* SEARCH + USER */}

        <div
          className="
            flex
            items-center
            gap-5
          "
        >
          {/* SEARCH */}

          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
            "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="white"
                strokeWidth="2"
              />

              <path
                d="M16.5 16.5L21 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* USER */}

          <button
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
            "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="white"
            >
              <circle
                cx="12"
                cy="7"
                r="4"
              />

              <path
                d="M4 22c0-4.4 3.6-7 8-7s8 2.6 8 7H4Z"
              />
            </svg>
          </button>
        </div>
      </header>

      {/* ======================================================
          HERO CONTENT
      ======================================================= */}

      <div
        className="
          absolute
          left-6
          top-[42%]
          z-20
          -translate-y-1/2
          md:left-10
          lg:left-[6%]
        "
      >
        <div
          className="
            max-w-[530px]
          "
        >
          {/* CONTINENT */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-5
              text-xl
              text-white
              md:text-2xl
            "
          >
            <span>
              {hero.continent}
            </span>

            <span
              className="
                h-[2px]
                w-24
                bg-white
              "
            />
          </div>

          {/* HERO NAME */}

          <h1
            className="
              text-6xl
              font-medium
              leading-none
              tracking-tight
              text-white
              md:text-8xl
              xl:text-[100px]
            "
          >
            {hero.name}
          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              mt-6
              max-w-[510px]
              text-lg
              leading-relaxed
              text-white
              md:text-xl
            "
          >
            {hero.description}
          </p>

          {/* BUTTONS */}

          <div
            className="
              mt-10
              flex
              items-center
              gap-7
            "
          >
            {/* BOOKMARK */}

            <button
              className="
                flex
                h-[70px]
                w-[70px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-green-600
              "
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path
                  d="M6 3h12v18l-6-4-6 4V3Z"
                />
              </svg>
            </button>

            {/* DISCOVER */}

            <button
              className="
                h-[70px]
                min-w-[320px]
                rounded-full
                border-2
                border-white
                px-10
                text-2xl
                text-white
              "
            >
              Discover Location
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================
          DESTINATION CARDS
      ======================================================= */}

      <div
        className="
          absolute
          bottom-[7%]
          right-0
          z-20
          h-[428px]
          w-[50%]
          overflow-hidden
        "
      >
        <div
          className="
            relative
            h-full
            w-full
          "
        >
          {cards.map((destination, index) => {
            const isLarge = index === 0;

            return (
              <article
                key={destination.id}
                onClick={() =>
                  handleCardClick(index)
                }
                style={getCardStyle(index)}
                className="
                  absolute
                  bottom-0
                  overflow-hidden
                  rounded-[20px]
                  transition-all
                  duration-[650ms]
                  ease-[cubic-bezier(0.22,1,0.36,1)]
                "
              >
                {/* CARD IMAGE */}

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    rounded-[20px]
                    object-cover
                  "
                />

                {/* SAME CARD OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    rounded-[20px]
                    bg-black/35
                  "
                />

                {/* CARD CONTENT */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-6
                    text-white
                  "
                >
                  {/* CONTINENT */}

                  <div
                    className="
                      mb-2
                      flex
                      items-center
                      gap-3
                      text-sm
                    "
                  >
                    <span>
                      {destination.continent}
                    </span>

                    <span
                      className="
                        h-px
                        w-12
                        bg-white
                      "
                    />
                  </div>

                  {/* NAME */}

                  <h2
                    className={`
                      font-medium
                      leading-none

                      ${
                        isLarge
                          ? `
                            mb-4
                            text-[40px]
                          `
                          : `
                            mb-3
                            text-[32px]
                          `
                      }
                    `}
                  >
                    {destination.name}
                  </h2>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      max-w-full
                      text-[13px]
                      leading-[1.35]
                      text-white
                    "
                  >
                    {destination.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ======================================================
          COUNTER
      ======================================================= */}

      <div
        className="
          absolute
          bottom-[6%]
          left-[6%]
          z-20
          text-white
        "
      >
        <span
          className="
            text-7xl
            font-medium
          "
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}