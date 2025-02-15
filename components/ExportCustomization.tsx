interface ThemePreviewProps {
  name: string;
}

function ThemePreview({ name }: ThemePreviewProps) {
  return (
    <div className="p-3 border border-surface-200 dark:border-dark rounded-lg hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer transition-all">
      <div className="w-full h-24 bg-surface-50 dark:bg-dark-card rounded-md mb-2"></div>
      <span className="text-sm text-surface-600 dark:text-dark-secondary">{name}</span>
    </div>
  );
}

function ColorPicker() {
  const colors = [
    '#0366d6', // GitHub Blue
    '#2ea44f', // GitHub Green
    '#6f42c1', // GitHub Purple
    '#1a7f37', // GitHub Forest
    '#cf222e', // GitHub Red
  ];

  return (
    <div className="flex space-x-2">
      {colors.map((color) => (
        <button
          key={color}
          className="w-8 h-8 rounded-full border-2 border-white dark:border-dark shadow-sm hover:scale-110 transition-transform"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export default function ExportCustomization() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Export Options</h3>
      
      {/* Tema Seçimi */}
      <div>
        <label className="block text-sm font-medium mb-2">Theme</label>
        <div className="grid grid-cols-4 gap-3">
          <ThemePreview name="Modern" />
          <ThemePreview name="Classic" />
          <ThemePreview name="Minimal" />
          <ThemePreview name="Creative" />
        </div>
      </div>
      
      {/* Renk Şeması */}
      <div>
        <label className="block text-sm font-medium mb-2">Color Scheme</label>
        <div className="flex space-x-3">
          <ColorPicker />
        </div>
      </div>
      
      {/* Sayfa Düzeni */}
      <div>
        <label className="block text-sm font-medium mb-2">Layout</label>
        <select className="w-full px-3 py-2 border border-surface-200 dark:border-dark rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-card dark:text-dark">
          <option value="single">Single Page</option>
          <option value="double">Double Page</option>
          <option value="compact">Compact</option>
        </select>
      </div>
      
      {/* Diğer Özelleştirmeler */}
    </div>
  );
} 