import React from 'react';

const InputField = ({ label, ...props }) => (
  <div className="mb-4">
    <label className="block text-white">{label}</label>
    <input {...props} className="w-full p-2 rounded-md" />
  </div>
);

export default InputField;
