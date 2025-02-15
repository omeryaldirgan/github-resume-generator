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
        <select className="input-primary w-full">
          <option value="single">Single Page</option>
          <option value="double">Double Page</option>
          <option value="compact">Compact</option>
        </select>
      </div>
      
      {/* Diğer Özelleştirmeler */}
    </div>
  );
} 