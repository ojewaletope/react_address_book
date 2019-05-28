import React from "react";

const FormInput = ({ name, placeholder, type, value, onChange, className }) => {
  return (
      <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} className={className}/>
  );
};

export default FormInput;
