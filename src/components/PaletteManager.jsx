import { useState } from "react";
import presetPalettes from "../data/preset-palettes";
import { converter, formatHex, formatHsl, formatRgb, clampRgb, formatCss, oklch, rgb } from "culori";
import PresetsSection from "./sections/Presets";
import CustomSection from "./sections/Custom";
import BrandSection from "./sections/Brand";

export default function PaletteManager() {

  const [activeTab, setActiveTab] = useState("Presets");
  const [l, setL] = useState(60);
  const [c, setC] = useState(0.1);
  const [h, setH] = useState(200);
  // const [prefixes, setPrefixes] = useState({});
  // const [formats, setFormats] = useState({});

  const [brandHex, setBrandHex] = useState("#3b82f6");
  const [lightRate, setLightRate] = useState(1.0);
  const [darkRate, setDarkRate] = useState(1.0);

  const oklch = converter('oklch');

  // 1. Create the state for your manual nudges (near your other useState calls)
  const [overrides, setOverrides] = useState({});

  // 2. Generate the "Math" palette using that function we perfected
  const generatedPalette = generateBrandPalette(brandHex, lightRate, darkRate);

  // 3. Merge them: This creates the "Final" version that has your nudges applied
  const finalDisplayPalette = { ...generatedPalette, ...overrides };

  // const [swatchCount, setSwatchCount] = useState(10);
  const swatchCount = 9;
  // const shades = {};


  const copyToClipboard = (shades, prefix, format = "hex") => {
    const cssRows = Object.entries(shades).map(([key, value]) => {
      let formattedValue = value;

      try {
        if (format === "oklch") {
          // Convert to oklch object, then use formatCss to get "oklch(0.x ...)"
          formattedValue = formatCss(oklch(value));
        } else if (format === "hex") {
          formattedValue = formatHex(value);
        } else if (format === "hsl") {
          formattedValue = formatHsl(value);
        } else if (format === "rgb") {
          formattedValue = formatRgb(rgb(value));
        }
      } catch (e) {
        console.warn("Conversion failed for:", value);
      }

      const varName = prefix ? `${prefix}${key}` : key;
      return `  ${varName}: ${formattedValue};`;
    });

    const finalCSS = cssRows.join("\n");
    navigator.clipboard.writeText(finalCSS);
  };


  // PERFECT - PRESERVE AT ALL COSTS!!!!!!!!!
  function generatePalette({ l, c, h }) {
    const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const shades = {};
    const pivot = l;

    // 1. Dynamic window boundaries
    // At pivot 0.5: Start is 0.98, End is 0.03 (Full Range)
    // At pivot 1.0: Start is 0.98, End is 0.5 (Light half)
    // At pivot 0.0: Start is 0.5, End is 0.03 (Dark half)
    const startL = pivot >= 0.5 ? 0.98 : 0.5 + (pivot * 0.96);
    const endL = pivot <= 0.5 ? 0.03 : 0.03 + (pivot - 0.5) * 0.94;

    // 2. Distribution of darks 
    // We still need a tiny bit of math to make the darks stretch 
    // more than the lights—human eyes need this for "detail."
    const skew = 1.2 + (Math.sin(Math.PI * pivot) * 0.4);

    keys.forEach((key, i) => {
      const t = Math.pow(i / (keys.length - 1), skew);

      // Lightness simply slides between our two window points
      const L = startL + t * (endL - startL);

      // 3. Chroma Seesaw
      // High lightness = high chroma at bottom (950)
      // Low lightness = high chroma at top (50)
      const topC = c * (1 - pivot * 0.7);
      const botC = c * (0.2 + pivot * 0.8);
      const baseC = topC + t * (botC - topC);

      // 4. Taper based on Lightness 
      // Ensure the high-lightness tints remain light & airy instead of neon.
      const taper = Math.pow(L * (1 - L) * 4, 0.5 + Math.sin(Math.PI * pivot) * 0.3);

      shades[key] = formatHex(clampRgb({ mode: "oklch", l: L, c: Math.max(0.001, baseC * taper), h }));
    });

    return shades;
  }

  const customPalette = generatePalette({
    l: l / 100,
    c,
    h
  });


  const handleBrandColorChange = (e) => {
    const hex = e.target.value;
    const color = oklch(hex);

    if (color) {
      // Culori returns { mode: 'oklch', l: 0.x, c: 0.x, h: 0.x }
      // We update your state which pivots the generator
      setL(color.l);
      setC(color.c);
      setH(color.h || 0); // Default to 0 if hue is undefined (achromatic)
    }
  };


  function generateBrandPalette(brandHex, lRate = 1, dRate = 1, lightSteps = 5, darkSteps = 5) {
    const brand = oklch(brandHex) || { l: 0, c: 0, h: 0 };
    const palette = {};

    const lightKeys = [50, 100, 200, 300, 400].slice(-lightSteps);
    const darkKeys = [600, 700, 800, 900, 950].slice(0, darkSteps);

    // Light ramp
    for (let i = 0; i < lightSteps; i++) {
      const tRaw = (i + 1) / (lightSteps + 1);

      // BUFFER: We cap the exponent between 0.2 and 4.0
      // This ensures we never hit a "flat" line even at slider extremes
      const exponent = Math.min(Math.max(lRate / 2.5, 0.2), 4.0);

      const t = 1 - Math.pow(1 - tRaw, 1 / exponent);

      const ceiling = 0.995;
      const L = brand.l + (ceiling - brand.l) * t;

      const taper = Math.pow(L * (1 - L) * 4, 0.6);
      const targetC = brand.c * (1.1 - (t * 0.6));

      const key = lightKeys[lightSteps - 1 - i];
      palette[key] = formatHex(clampRgb({
        mode: "oklch", l: L, c: Math.max(0.001, targetC * taper), h: brand.h
      }));
    }

    // Brand anchor
    palette[500] = brandHex;

    // Dark Ramp
    for (let i = 0; i < darkSteps; i++) {
      const rawStep = (i + 1) / (darkSteps + 1);

      // THE LINEAR REMAP:
      // We map the 0-5 slider to a 0.5-3.0 exponent range.
      // Slider 0.0 -> Math uses 0.5 (Your Perfect "Airy" Dark Spread)
      // Slider 2.5 -> Math uses 1.75 (Balanced Middle)
      // Slider 5.0 -> Math uses 3.0 (Steep/Tailwind-ish)
      const safeDRate = 0.5 + (dRate * 0.5);

      const t = Math.pow(rawStep, safeDRate);

      palette[darkKeys[i]] = formatHex(
        clampRgb({
          mode: "oklch",
          l: brand.l - (brand.l - 0.05) * t,
          c: brand.c * (1 - t * 0.8),
          h: brand.h
        })
      );
    }

    return palette;
  }

  return (
    <div className="p-12 space-y-6 bg-white rounded-xl max-w-250 mx-auto">
      <div>
        {/* Tabs */}
        <div className="flex mb-4">
          {["Presets", "Brand", "Custom"].map(tab => (
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
            <PresetsSection
              palettes={presetPalettes}
            />
          )}

          {activeTab === "Brand" && (
            <BrandSection
              brandHex={brandHex}
              setBrandHex={setBrandHex}
              lightRate={lightRate}
              setLightRate={setLightRate}
              darkRate={darkRate}
              setDarkRate={setDarkRate}
              setOverrides={setOverrides}
              finalDisplayPalette={finalDisplayPalette}
            />
          )}

          {activeTab === "Custom" && (
            <CustomSection
              l={l}
              c={c}
              h={h}
              setL={setL}
              setC={setC}
              setH={setH}
              customPalette={customPalette}
              handleBrandColorChange={handleBrandColorChange}
            />
          )}

        </div>
      </div>
    </div>
  )
}