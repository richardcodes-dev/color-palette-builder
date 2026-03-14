import { useState } from "react";
import { PresetsSection } from "./sections/PresetsSection";
import { CustomSection } from "./sections/CustomSection";
import { BrandSection } from "./sections/BrandSection";

export const PaletteManager = () => {

  const tabs = [
    { name: "Presets", component: PresetsSection },
    { name: "Brand", component: BrandSection },
    { name: "Custom", component: CustomSection }
  ];
  const [activeTab, setActiveTab] = useState("Presets");
  const ActiveComponent = tabs.find(t => t.name === activeTab)?.component;

  return (
    <div className="p-12 space-y-6 bg-white rounded-xl max-w-250 mx-auto">
      <div>
        {/* Tabs */}
        <div className="flex mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`px-4 py-2 border-b-2 ${activeTab === tab.name ? "border-blue-500" : "border-transparent"}`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {<ActiveComponent />}
        </div>
      </div>
    </div>
  )
}