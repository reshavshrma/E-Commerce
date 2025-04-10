const ImageUploader = ({ onChange }) => {
    const handleImageSelect = (e) => {
      const files = Array.from(e.target.files).slice(0, 7);
      onChange(files);
    };
  
    return (
      <div>
        <label className="block font-medium mb-1">Upload Images (max 7)</label>
        <input
        name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="w-full border rounded p-2"
        />
      </div>
    );
  };
  
  export default ImageUploader;
  