export const Animation = () => {
  //   const listTimeline = gsap.timeline();

  //   listTimeline.from(".movie-list li", {
  //     y: -10,
  //     opacity: 0,
  //     stagger: 0.2,
  //     // duration: 0.2,
  //   });

  const titleTimeline = gsap.timeline({
    defaults: {
      duration: 0.3,
    },
  });

  titleTimeline
    .from(".intro__sub-title", {
      opacity: 0,
      y: -10,
    })
    .from(".intro__title", {
      opacity: 0,
      y: -10,
    })
    .from(".intro__recommend", {
      opacity: 0,
      y: -10,
    })
    .from(".main-search-box", {
      opacity: 0,
      y: -10,
    })
    .from(
      ".select-box-wrap",
      {
        opacity: 0,
        y: -10,
      },
      "<"
    )
    .from(
      ".movie-list li",
      {
        y: -10,
        opacity: 0,
        stagger: 0.2,
        // duration: 0.2,
      },
      "<"
    );
};
