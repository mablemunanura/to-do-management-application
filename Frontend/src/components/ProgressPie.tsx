type ProgressPieProps = {
  progress: number; // 0, 25, 50, 75, 100
};

export default function ProgressPie({ progress }: ProgressPieProps) {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 12 12)"
      />
    </svg>
  );
}
