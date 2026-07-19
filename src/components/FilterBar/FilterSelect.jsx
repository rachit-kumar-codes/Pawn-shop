
export default function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="filter-select">
      <span className="filter-select__label">{label}</span>
      <select className="select" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
