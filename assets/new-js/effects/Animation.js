export const Animation = () => {
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
    });
};
