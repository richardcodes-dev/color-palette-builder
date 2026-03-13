import Swatches from "../ui/Swatches";
import ExportControls from "../ui/ExportControls";

const BrandSection = ({
  brandHex,
  setBrandHex,
  lightRate,
  setLightRate,
  darkRate,
  setDarkRate,
  setOverrides,
  finalDisplayPalette,
}) => {


  const resetPalette = () => {
    setOverrides({});
  }

  return (

    <div className="space-y-6">
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* Light Slider */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Light Spread</label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={lightRate}
              onChange={(e) => {
                setLightRate(parseFloat(e.target.value));
                resetPalette();
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Color Picker */}
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden">
              {/* 1. The Visual Circle: This fills the background with your color */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: brandHex }}
              />

              {/* 2. The Invisible Engine: This catches the click and opens the picker */}
              <input
                type="color"
                value={brandHex}
                onChange={(e) => {
                  setBrandHex(e.target.value);
                  resetPalette(); // Clear overrides when brand color changes
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer scale-150"
              />
            </div>
            <span className="font-mono text-sm font-bold text-slate-600 uppercase">{brandHex}</span>
          </div>

          {/* Dark Slider */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Dark Spread</label>
            <input
              type="range" min="0.1" max="3" step="0.1"
              value={darkRate}
              onChange={(e) => {
                setDarkRate(parseFloat(e.target.value));
                resetPalette();
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

        </div>
      </div>

      {/* Use your existing Swatches component here in the parent */}
      {/* <Swatches shades={brandPalette} /> */}
      <Swatches
        shades={finalDisplayPalette}
        onChange={(key, hex) => setOverrides(prev => ({ ...prev, [key]: hex }))}
      />

      <ExportControls palette={finalDisplayPalette} />
    </div>

  )
}

export default BrandSection;