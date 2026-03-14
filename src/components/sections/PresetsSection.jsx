import { Swatches } from '../ui/Swatches';
import { ExportControls } from '../ui/ExportControls';
import { presetPalettes as palettes } from '../../data/preset-palettes';

export const PresetsSection = () => {

  return (

    <div>
      {Object.entries(palettes).map(([name, colors]) => (
        <div key={name} className="mb-6">
          <h3 className="mb-2 font-semibold">{name}</h3>

          <Swatches palette={colors} />

          <ExportControls
            palette={colors}
            defaultPrefix={`--color-${name}-`}
          />
        </div>
      ))}
    </div>

  );
};