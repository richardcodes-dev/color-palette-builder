export const Swatches = ({ palette, onChange }) => {
  return (
    <div className="flex w-full gap-2">
      {Object.entries(palette).map(([key, value]) => {
        const isInteractive = !!onChange;

        return (
          <div key={key} className="flex flex-col justify-center gap-1.5">
            <div
              className="relative h-16 rounded-lg aspect-square border border-black/5 overflow-hidden"
              style={{ backgroundColor: value }}
            >
              {/* Only render the input if we provided an onChange handler */}
              {isInteractive && (
                <input
                  type="color"
                  value={value}
                  onChange={(e) => onChange(key, e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title={`Fine-tune ${key}`}
                />
              )}
            </div>
            <p className="font-mono text-[10px] font-bold text-center text-body/50 dark:text-grey-400">
              {key}
            </p>
          </div>
        );
      })}
    </div>
  );
}