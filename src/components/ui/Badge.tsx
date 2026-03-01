interface BadgeProps {
  count: number;
}

export function Badge({ count }: BadgeProps) {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
      {count > 99 ? '99+' : count}
    </span>
  );
}
