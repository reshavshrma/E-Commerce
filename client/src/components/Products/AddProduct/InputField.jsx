const InputField = ({ label, name, type = "text", value, onChange, required = false, textarea = false }) => (
  <div className="space-y-2">
    <label className="block font-medium text-gray-700">{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none transition"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
      />
    )}
  </div>
);

export default InputField;
