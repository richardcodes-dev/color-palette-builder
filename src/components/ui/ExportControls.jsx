export default function ExportControls({
  prefix,
  onPrefixChange,
  format,
  onFormatChange,
  onCopy,
  onReset
}) {
  return (
    <div className="flex gap-2 items-center mt-4">
      {/* Prefix input */}
      <input
        className="border px-2 py-1 rounded text-sm bg-white dark:bg-grey-800"
        value={prefix}
        onChange={(e) => onPrefixChange(e.target.value)}
        placeholder="Prefix (e.g., primary)"
      />

      {/* Format selector */}
      <select
        className="border px-2 py-1 rounded text-sm bg-white dark:bg-grey-800"
        value={format}
        onChange={(e) => onFormatChange(e.target.value)}
      >
        <option value="hex">HEX</option>
        <option value="rgb">RGB</option>
        <option value="hsl">HSL</option>
        <option value="oklch">OKLCH</option>
      </select>

      {/* Copy button */}
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-700 transition-colors"
        onClick={onCopy}
      >
        Copy CSS
      </button>

      {/* Reset button */}
      <button
        className="text-xs text-body/50 hover:text-body cursor-pointer"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}