import { useState } from "react";
import { Swatches } from "../ui/Swatches";
import { ExportControls } from "../ui/ExportControls";
import { generateCustomColorScale } from "../../utils/palette-utils";

export const CustomSection = () => {

  const [l, setL] = useState(60);
  const [c, setC] = useState(0.1);
  const [h, setH] = useState(200);
  const palette = generateCustomColorScale({ l: l / 100, c, h });

  return (

    <div>
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
      </div>

      <Swatches palette={palette} />

      <ExportControls
        palette={palette}
        defaultPrefix="--color-custom-"
      />
    </div>

  )
};