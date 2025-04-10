const sizes = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];

const SizeCheckbox = ({ selectedSizes, onChange }) => (
  <div>
    <label className="block font-medium mb-1">Select Sizes</label>
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => (
        <label key={size} className="flex items-center gap-1">
          <input
            type="checkbox"
            name="sizes"
            checked={selectedSizes.includes(size)}
            onChange={() => onChange(size)}
          />
          {size.toUpperCase()}
        </label>
      ))}
    </div>
  </div>
);

export default SizeCheckbox;
