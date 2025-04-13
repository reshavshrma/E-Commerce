import { useEffect, useState } from "react";

const ImageUploader = ({ onChange, images }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (images?.length > 0) {
      const urls = images.map((img) => URL.createObjectURL(img));
      setPreviewUrls(urls);

      // Clean up object URLs to prevent memory leaks
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviewUrls([]);
    }
  }, [images]);

  const handleImageSelect = (e) => {
    const selectedFiles = Array.from(e.target.files).slice(0, 7);
    onChange(selectedFiles);
  };

  return (
    <div className="w-full">
      <label className="block font-medium mb-2 text-gray-700">Upload Product Images (Max 7)</label>

      <input
        type="file"
        name="images"
        accept="image/*"
        multiple
        onChange={handleImageSelect}
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      {/* Image Count Display */}
      <p className="text-sm text-gray-600 mt-1">
        {images?.length || 0} / 7 images selected
      </p>

      {/* Preview Grid */}
      {previewUrls?.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewUrls.map((src, idx) => (
            <div
              key={idx}
              className="relative border rounded-lg overflow-hidden group shadow-sm"
            >
              <img
                src={src}
                alt={`preview-${idx}`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <span className="text-white text-xs">Image {idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
