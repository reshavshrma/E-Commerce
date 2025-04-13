const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

const SizeCheckbox = ({ selectedSizes, onChange }) => (
  <div>
    <label className="block font-medium mb-2 text-gray-700">Select Sizes</label>
    <div className="flex flex-wrap gap-4">
      {sizes.map((size) => (
        <label key={size} className="flex items-center gap-2">
          <input
            type="checkbox"
            name="sizes"
            checked={selectedSizes.includes(size)}
            onChange={() => onChange(size)}
            className="form-checkbox text-blue-600 rounded-md"
          />
          <span className="text-gray-700">{size.toUpperCase()}</span>
        </label>
      ))}
    </div>
  </div>
);

export default SizeCheckbox;
