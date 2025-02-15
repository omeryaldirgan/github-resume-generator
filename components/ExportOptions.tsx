type ExportOptions = {
  format: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  includeQRCode: boolean;
  watermark: boolean;
  colorScheme: 'color' | 'grayscale';
}; 