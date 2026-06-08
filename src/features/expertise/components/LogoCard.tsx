interface LogoCardProps {
  name: string;
}

export function LogoCard({ name }: LogoCardProps) {
  return (
    <span className="logo-card-item">
      {name}
    </span>
  );
}
