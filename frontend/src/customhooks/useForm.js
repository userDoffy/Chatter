import { useState } from 'react';

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If formData is an array (like in OTP case)
    if (Array.isArray(formData)) {
      const index = parseInt(name);
      const newArray = [...formData];
      newArray[index] = value;
      setFormData(newArray);
    } else {
      // Regular object-based form (default)
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return { formData, handleChange };
};

export default useForm;
