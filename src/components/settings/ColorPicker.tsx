import React from 'react';

interface ColorPickerProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, color, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{label}</h3>
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg border"
          style={{ backgroundColor: color }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="h-10"
        />
      </div>
    </div>
  );
};