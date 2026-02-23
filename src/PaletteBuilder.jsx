import { useState } from "react"
import { palettes } from "./palettes"
import PaletteTabs from "./components/PaletteTabs"

export default function PaletteBuilder() {

  return (
    <div className="p-12 space-y-6 bg-white rounded-xl">
      <PaletteTabs />
    </div>
  )
  // const [selected, setSelected] = useState("gray")

  // const palette = palettes[selected]

  // const cssOutput = Object.entries(palette)
  //   .map(([key, value]) => `--color-${selected}-${key}: ${value};`)
  //   .join("\n")

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(cssOutput)
  // }

  // return (
  //   <div className="p-12 space-y-6 bg-white rounded-xl">
  //     <div className="flex gap-4">
  //       {Object.keys(palettes).map(name => (
  //         <button
  //           key={name}
  //           onClick={() => setSelected(name)}
  //           className="px-3 py-1 border rounded"
  //         >
  //           {name}
  //         </button>
  //       ))}
  //     </div>

  //     <div className="flex w-full h-16 gap-2">
  //       {Object.entries(palette).map(([key, value]) => (
  //         <div key={key} className="flex flex-col justify-center gap-1.5">
  //           <div
  //             className="h-full gap-2 text-xs rounded-lg aspect-square"
  //             style={{ backgroundColor: value }}
  //           >
  //           </div>
  //           <p className="font-mono text-xs font-bold text-center text-body/50 dark:text-grey-400">{key}</p>
  //         </div>
  //       ))}
  //     </div>

  //     <button
  //       onClick={copyToClipboard}
  //       className="px-4 py-2 text-white bg-black rounded"
  //     >
  //       Copy CSS
  //     </button>
  //   </div>
  // )
}
