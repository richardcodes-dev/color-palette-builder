import { formatHex, formatHsl, formatRgb, formatCss, oklch, rgb } from "culori";

export default function stringifyPalette(palette, prefix, format) {
  const cssRows = Object.entries(palette).map(([key, value]) => {
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
  return finalCSS;
}