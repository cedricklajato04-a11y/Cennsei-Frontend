export function Icon({ name }: { name: string }) {
  return <span className={`icon icon-${name}`} aria-hidden="true" />;
}
