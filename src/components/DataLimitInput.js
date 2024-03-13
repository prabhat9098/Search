
import React from 'react';

const DataLimitInput = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  

  return (
    <div>
      <span>Show: </span>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        min={1}
        max={10} // Max limit set to 10
      />
    </div>
  );
};

export default DataLimitInput;
