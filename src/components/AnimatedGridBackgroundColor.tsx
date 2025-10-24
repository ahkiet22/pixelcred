export default function AnimatedGridBackgroundColor({
  length = 144,
}: {
  length?: number;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <div className="grid grid-cols-12 grid-rows-12 h-full">
        {[...Array(length)].map((_, i) => (
          <div
            key={i}
            className="border border-black/40 border-dashed transition-all duration-700"
            style={{
              backgroundColor: "#EAFDC6"
            }}
          />
        ))}
      </div>
    </div>
  );
}
