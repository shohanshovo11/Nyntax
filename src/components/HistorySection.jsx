export default function HistorySection({ wordHistoryArray }) {
  return (
    <div className="h-80 max-w-64 overflow-y-auto">
      <div className="flex flex-col gap-2 w-60 mt-4">
        {wordHistoryArray.map((word, idx) => (
          <label
            key={idx}
            className="bg-black text-lg text-white pl-3 pr-6 rounded-sm py-2"
          >
            {word.value}
          </label>
        ))}
      </div>
    </div>
  );
}
