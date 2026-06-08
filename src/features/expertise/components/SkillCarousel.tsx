interface SkillCarouselProps {
  items: string[];
  speed?: number; // seconds
}

export function SkillCarousel({ items, speed = 32 }: SkillCarouselProps) {
  // Duplicate the list to create a seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div className="carousel-viewport" aria-hidden="true">
      <div
        className="carousel-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span className="carousel-item" key={`${item}-${i}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
