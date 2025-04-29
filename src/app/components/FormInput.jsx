'use client';

export default function FormInput({
  label,
  name,
  type,
  value,
  onChange,
  required = true,
}) {
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
    </div>
  );
}
