export function MatchCardSkeleton() {
  return (
    <div className="relative w-full min-h-[280px] h-full rounded-xl overflow-hidden shadow-lg group flex flex-col bg-gray-200 dark:bg-gray-800 animate-pulse">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 z-0" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 p-4 h-full flex flex-col justify-between flex-1">
        {/* Header */}
        <div className="flex justify-between items-start gap-2">
          <div className="bg-white/50 w-20 h-6 rounded-full shrink-0" />
          <div className="flex gap-1.5 shrink-0">
            <div className="bg-white/50 w-8 h-8 rounded-full" />
            <div className="bg-white/50 w-8 h-8 rounded-full" />
            <div className="bg-white/50 w-8 h-8 rounded-full" />
            <div className="bg-white/50 w-20 h-8 rounded-full" />
          </div>
        </div>

        {/* Center Details */}
        <div className="flex flex-col items-center justify-center text-center my-4 py-2">
          <div className="bg-white/40 w-48 h-10 rounded-full mb-4 shadow-md" />

          <div className="flex flex-wrap justify-between w-full max-w-[420px] px-1 gap-2">
            <div className="flex-1 min-w-[100px] h-14 bg-[#242424a6]/40 rounded backdrop-blur-sm" />
            <div className="flex-1 min-w-[100px] h-14 bg-[#242424a6]/40 rounded backdrop-blur-sm" />
            <div className="flex-1 min-w-[100px] h-14 bg-[#242424a6]/40 rounded backdrop-blur-sm" />
          </div>

          <div className="mt-5 w-64 h-12 bg-white/40 rounded-full backdrop-blur-sm" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-auto pt-2">
          <div className="flex-1 min-w-[120px] max-w-[150px] h-10 bg-primary/50 rounded-full shadow-lg" />
          <div className="flex-1 min-w-[140px] max-w-[170px] h-10 bg-white/50 rounded-full shadow-lg" />
        </div>
      </div>
    </div>
  );
}
