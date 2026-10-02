export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded border border-amber-300 bg-amber-50 text-amber-900 text-xs font-mono tracking-tight ${className}`}
      role="status"
    >
      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
      <span>DEMO DATA &bull; Sample Campaign for Assessment Demonstration</span>
    </div>
  );
}
