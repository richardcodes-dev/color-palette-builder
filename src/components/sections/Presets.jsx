import Swatches from '../ui/Swatches';
import ExportControls from '../ui/ExportControls';

const PresetsSection = ({ palettes }) => {
  return (

    <div>
      {Object.entries(palettes).map(([name, shades]) => (
        <div key={name} className="mb-6">
          <h3 className="mb-2 font-semibold">{name}</h3>
          <Swatches shades={shades} />

          <ExportControls
            palette={shades}
            defaultPrefix={`--color-${name}-`}
          />
        </div>
      ))}
    </div>

  );
};

export default PresetsSection;