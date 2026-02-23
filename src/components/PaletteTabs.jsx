import { useState } from "react";
import PaletteSwatches from "./PaletteSwatches";
import CustomControls from "./CustomControls";
import { palettes } from "../../palettes";

export default function PaletteTabs() {
  const [activeTab, setActiveTab] = useState("Presets");
  const [l, setL] = useState(60);
  const [c, setC] = useState(0.1);
  const [h, setH] = useState(200);
  const [swatchCount, setSwatchCount] = useState(5);
  const shades = {};

  for (let i = 0; i < swatchCount; i++) {
    const step = (i - Math.floor(swatchCount / 2)) * 10;
    const lightness = l - step;

    shades[i] = `oklch(${lightness}% ${c} ${h})`;
  }


  const cssOutput = (paletteObject, prefix) =>
    Object.entries(paletteObject)
      .map(([key, value]) => `--color-${prefix}-${key}: ${value};`)
      .join("\n");

  const copyToClipboard = (paletteObject, prefix) => {
    navigator.clipboard.writeText(cssOutput(paletteObject, prefix));
  };

  const generatePalette = ({ l, c, h, count }) => {
    const shades = {};
    // Generate keys evenly between 50 → 900
    const keys = Array.from({ length: count }, (_, i) =>
      Math.round(50 + (i * (900 - 50)) / (count - 1))
    );

    keys.forEach((key, i) => {
      const offset = i - Math.floor(count / 2);
      const lightness = l - offset * 8; // adjust spacing as you like
      shades[key] = `oklch(${lightness}% ${c} ${h})`;
    });

    return shades;
  };

  const customPalette = generatePalette({ l, c, h, count: swatchCount });


  return (
    <div>
      {/* Tabs */}
      <div className="flex mb-4">
        {["Presets", "Custom"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-b-2 ${activeTab === tab ? "border-blue-500" : "border-transparent"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Presets" && (
          <div>
            {Object.entries(palettes).map(([name, shades]) => (
              <div key={name} className="mb-6">
                <h3 className="mb-2 font-semibold">{name}</h3>
                <PaletteSwatches shades={shades} />
                <button
                  className="bg-primary-500 text-white px-3 py-1 rounded mt-8 cursor-pointer hover:bg-primary-700"
                  onClick={() => copyToClipboard(palettes[name], name)}
                >
                  Copy CSS
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Custom" && (
          <div>
            <CustomControls
              l={l}
              c={c}
              h={h}
              setL={setL}
              setC={setC}
              setH={setH}
              swatchCount={swatchCount}
              setSwatchCount={setSwatchCount}
            />
            <PaletteSwatches shades={shades} />
            <button className="btn btn-primary" onClick={() => copyToClipboard(customPalette, "custom")}>
              Copy CSS
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
