import { useEffect, useState } from "react";
import axios from "axios";

const CategoryDropdown = ({ value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/category` , {withCredentials : true})
      
      
      .then((res) => {
        console.log(res.data);
        
        setCategories(res.data.data.categories || []) })
      .catch(() => setCategories([]));
  }, []);

  return (
    <div>
      <label className="block font-medium mb-1">Select Category</label>
      <select
        name="category"
        value={value}
        onChange={onChange}
        required
        className="w-full border rounded p-2"
      >
        <option value="">Select...</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
