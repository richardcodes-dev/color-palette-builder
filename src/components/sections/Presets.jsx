import Swatches from '../ui/Swatches';
import ExportControls from '../ui/ExportControls';

const PresetsSection = ({
  palettes,
  prefixes,
  setPrefixes,
  formats,
  setFormats,
  copyToClipboard
}) => {
  return (

    <div>
      {Object.entries(palettes).map(([name, shades]) => (
        <div key={name} className="mb-6">
          <h3 className="mb-2 font-semibold">{name}</h3>
          <Swatches shades={shades} />

          <ExportControls
            palette={shades}
            prefix={prefixes[name] || `--color-${name}-`}
            onPrefixChange={(val) => setPrefixes(prev => ({ ...prev, [name]: val }))}
            format={formats[name] || "hex"}
            onFormatChange={(val) => setFormats(prev => ({ ...prev, [name]: val }))}

            // ADD THE FALLBACKS HERE:
            onCopy={() => copyToClipboard(
              shades,
              prefixes[name] || `--color-${name}-`,
              formats[name] || "hex"
            )}

            onReset={() => {
              setPrefixes(prev => ({ ...prev, [name]: `--color-${name}-` }));
              setFormats(prev => ({ ...prev, [name]: "hex" }));
            }}
          />
        </div>
      ))}
    </div>

  );
};

export default PresetsSection;