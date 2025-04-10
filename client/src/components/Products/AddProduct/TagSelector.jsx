const TagSelector = ({ value, onChange }) => (
    <div>
      <label className="block font-medium mb-1">Select Tag</label>
      <div className="flex gap-5">
        {["male", "female"].map((tag) => (
          <label key={tag} className="flex items-center gap-1">
            <input
              type="radio"
              name="tag"
              value={tag}
              checked={value === tag}
              onChange={onChange}
              required
            />
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
  
  export default TagSelector;
  