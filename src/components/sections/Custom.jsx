import Swatches from "../ui/Swatches";
import ExportControls from "../ui/ExportControls";
import { formatHex } from "culori";


const CustomSection = ({
  l, c, h, setL, setC, setH,
  customPalette,
  handleBrandColorChange,
}) => {

  return (

    <div>
      <div className="brand-color-picker mb-4">
        <label className="block text-sm font-medium mb-1">Pick Brand Color (500 Swatch)</label>
        <input
          type="color"
          onChange={handleBrandColorChange}
          // To keep the input in sync with sliders, convert current LCH back to hex
          value={formatHex({ mode: "oklch", l, c, h })}
          className="w-12 h-12 cursor-pointer rounded border-none"
        />
      </div>

      <div className="space-y-4">
        {/* Lightness */}
        <div>
          <label className="block mb-1 text-sm">
            Lightness: {l}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={l}
            onChange={e => setL(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Chroma */}
        <div>
          <label className="block mb-1 text-sm">
            Chroma: {c}
          </label>
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.001"
            value={c}
            onChange={e => setC(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Hue */}
        <div>
          <label className="block mb-1 text-sm">
            Hue: {h}
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={h}
            onChange={e => setH(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Swatch Count */}
        {/* <div>
          <label className="block mb-1 text-sm">
            Swatches: {swatchCount}
          </label>

          <select
            value={swatchCount}
            onChange={e => setSwatchCount(Number(e.target.value))}
            className="px-2 py-1 border"
          >
            {[5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div> */}
      </div>
      <Swatches shades={customPalette} />


      <ExportControls
        palette={customPalette}
        defaultPrefix="--color-custom-"
      />
    </div>

  )
};

export default CustomSection;