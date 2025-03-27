import * as React from "react";

export function Select({ value, onValueChange, children }) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="border p-2 rounded"
    >
      {children}
    </select>
  );
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }) {
  return <div className="p-2 border rounded">{children}</div>;
}

export function SelectContent({ children }) {
  return <div>{children}</div>;
}
