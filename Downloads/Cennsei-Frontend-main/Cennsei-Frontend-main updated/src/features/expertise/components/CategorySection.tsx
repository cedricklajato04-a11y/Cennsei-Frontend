import { SkillCarousel } from "./SkillCarousel";

interface CategorySectionProps {
  eyebrow: string;
  title: string;
  items: string[];
  speed?: number;
}

export function CategorySection({ eyebrow, title, items, speed }: CategorySectionProps) {
  return (
    <article className="glass-card category-section">
      <div className="category-header">
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
      </div>
      <SkillCarousel items={items} speed={speed} />
    </article>
  );
}
