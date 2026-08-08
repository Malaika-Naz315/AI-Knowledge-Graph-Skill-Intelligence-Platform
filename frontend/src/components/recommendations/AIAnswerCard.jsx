function AIAnswerCard({ title, items }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-slate-500">
          No data found.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-slate-50"
            >
              {Object.entries(item).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-1"
                >
                  <span className="font-medium capitalize">
                    {key.replaceAll("_", " ")}
                  </span>

                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AIAnswerCard;