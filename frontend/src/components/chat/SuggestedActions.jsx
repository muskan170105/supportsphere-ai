function SuggestedActions({ actions }) {
  return (
    <div className="border-t border-slate-800 p-5">

      <h3 className="text-white font-semibold mb-4">
        Suggested AI Actions
      </h3>

      <div className="flex flex-wrap gap-3">

        {actions.map((action, index) => (

          <button
            key={index}
            className="
              bg-cyan-600
              hover:bg-cyan-700
              px-4
              py-2
              rounded-lg
              text-sm
              transition
            "
          >
            {action}
          </button>

        ))}

      </div>

    </div>
  );
}

export default SuggestedActions;