import React from 'react';

const InputField = ({ label, value, onChange, type }) => (
  <div className="mb-4">
    <label className="block text-white mb-1">{label}</label>
    <input 
      type={type} 
      value={value} 
      onChange={onChange} 
      className="w-full p-2 rounded-md text-black"
    />
  </div>
);

export default InputField;
