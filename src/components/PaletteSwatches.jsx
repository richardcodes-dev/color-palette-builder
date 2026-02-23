export default function PaletteSwatches({ shades }) {
  return (
    <div className="flex w-full h-16 gap-2">
      {Object.entries(shades).map(([key, value]) => (
        <div key={key} className="flex flex-col justify-center gap-1.5">
          <div
            className="h-full gap-2 text-xs rounded-lg aspect-square"
            style={{ backgroundColor: value }}
          >
          </div>
          <p className="font-mono text-xs font-bold text-center text-body/50 dark:text-grey-400">{key}</p>
        </div>
      ))}
    </div>
  )
}