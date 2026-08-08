import { FaSearch } from "react-icons/fa";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-11
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          pl-11
          pr-4
          text-sm
          text-slate-700
          placeholder:text-slate-400
          outline-none
          transition-all
          duration-200
          focus:border-blue-600
          focus:ring-4
          focus:ring-blue-100
        "
      />
    </div>
  );
}

export default SearchBar;