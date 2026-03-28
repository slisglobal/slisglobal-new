export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0812] overflow-hidden">
      {/* Skeleton Nav */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 md:h-20 px-6 lg:px-20 flex items-center justify-between bg-white/[0.02] border-b border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded bg-white/10 animate-pulse" />
          <div className="w-24 md:w-32 h-5 rounded bg-white/10 animate-pulse" />
        </div>
        <div className="hidden md:flex items-center gap-8">
          <div className="w-20 h-3 rounded bg-white/10 animate-pulse" />
          <div className="w-16 h-3 rounded bg-white/10 animate-pulse" />
          <div className="w-20 h-3 rounded bg-white/10 animate-pulse" />
          <div className="w-28 h-10 rounded-full bg-white/10 animate-pulse" />
        </div>
        <div className="md:hidden w-8 h-8 rounded bg-white/10 animate-pulse" />
      </div>

      {/* Skeleton Hero */}
      <div className="pt-28 pb-16 md:pt-40 md:pb-24 px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
            <div className="w-56 h-8 bg-white/[0.06] rounded-full animate-pulse" />
            <div className="space-y-3">
              <div className="h-10 md:h-16 bg-white/[0.06] rounded-2xl w-full animate-pulse" />
              <div className="h-10 md:h-16 bg-white/[0.06] rounded-2xl w-4/5 animate-pulse" style={{ animationDelay: "0.1s" }} />
            </div>
            <div className="space-y-2">
              <div className="h-5 bg-white/[0.04] rounded-lg w-full max-w-lg animate-pulse" style={{ animationDelay: "0.15s" }} />
              <div className="h-5 bg-white/[0.04] rounded-lg w-3/4 max-w-lg animate-pulse" style={{ animationDelay: "0.2s" }} />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="h-14 w-full sm:w-40 bg-white/[0.06] rounded-xl animate-pulse" style={{ animationDelay: "0.25s" }} />
              <div className="h-14 w-full sm:w-48 bg-white/[0.06] rounded-xl animate-pulse" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-full aspect-square max-w-md lg:max-w-xl bg-white/[0.04] rounded-[2.5rem] animate-pulse" style={{ animationDelay: "0.15s" }} />
          </div>
        </div>
      </div>

      {/* Skeleton About Section */}
      <div className="py-16 md:py-24 px-6 lg:px-20">
        <div className="max-w-6xl mx-auto bg-white/[0.02] rounded-[2rem] md:rounded-[3rem] border border-white/5 p-8 md:p-10 lg:p-16">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 md:gap-16">
            <div className="space-y-4">
              <div className="w-24 h-3 bg-white/[0.06] rounded animate-pulse" />
              <div className="h-14 bg-white/[0.06] rounded-xl w-3/4 animate-pulse" />
              <div className="h-14 bg-white/[0.06] rounded-xl w-1/2 animate-pulse" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-6 bg-white/[0.04] rounded-lg w-full animate-pulse" />
                <div className="h-6 bg-white/[0.04] rounded-lg w-5/6 animate-pulse" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="h-32 bg-white/[0.03] rounded-2xl border border-white/5 animate-pulse" />
                <div className="h-32 bg-white/[0.03] rounded-2xl border border-white/5 animate-pulse" style={{ animationDelay: "0.1s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Cards Section */}
      <div className="py-16 md:py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 space-y-4">
            <div className="h-12 md:h-16 bg-white/[0.06] rounded-2xl w-3/4 mx-auto animate-pulse" />
            <div className="h-5 bg-white/[0.04] rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>
          {/* Mobile: single stacked card skeleton */}
          <div className="md:hidden space-y-4">
            <div className="h-56 bg-white/[0.03] rounded-[2rem] border border-white/5 animate-pulse" />
          </div>
          {/* Desktop: grid of card skeletons */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="h-56 bg-white/[0.03] rounded-[2rem] border border-white/5 animate-pulse" style={{ animationDelay: `${i * 0.08}s` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
