import { useEffect, useState } from "react";

const ImageUploader = ({ onChange, images }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    const urls = images.map((img) => URL.createObjectURL(img));
    setPreviewUrls(urls);

    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 7 total
    if (images.length >= 7) {
      alert("Maximum of 7 images allowed.");
      return;
    }

    const updatedImages = [...images, file];
    onChange(updatedImages);
  };

  const handleRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onChange(updatedImages);
  };

  return (
    <div className="w-full">
      <label className="block font-medium mb-2 text-gray-700">
        Upload Product Images (Max 7)
      </label>

      <input
        type="file"
        name="images"
        accept="image/*"
        onChange={handleImageSelect}
        disabled={images.length >= 7}
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <p className="text-sm text-gray-600 mt-1">
        {images.length} / 7 images selected
      </p>

      {previewUrls.length > 0 && (
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
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full hover:bg-red-700 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
