const InputField = ({ label, name, type = "text", value, onChange, required = false, textarea = false }) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full border rounded p-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full border rounded p-2"
        />
      )}
    </div>
  );
  
  export default InputField;
  