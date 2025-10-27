export default function AnimatedGridBackground({
  length = 144,
}: {
  length?: number;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-35 pointer-events-none">
      <div className="grid grid-cols-12 grid-rows-12 h-full">
        {[...Array(length)].map((_, i) => (
          <div
            key={i}
            className="border border-black/40 border-dashed transition-all duration-700"
            style={{
              backgroundColor:
                i % 7 === 0
                  ? "#ff008015"
                  : i % 7 === 1
                  ? "#9945ff15"
                  : i % 7 === 2
                  ? "#14f19515"
                  : i % 7 === 3
                  ? "#ffed0019"
                  : "transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}
