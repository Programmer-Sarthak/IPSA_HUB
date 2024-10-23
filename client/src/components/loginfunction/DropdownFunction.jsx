import React from "react";

function DropdownFunction({ setSelectedValue }) {
  const options = [
    { label: "Student", value: 1 },
    { label: "Faculty", value: 2 },
  ];

  function handleSelect(event) {
    setSelectedValue(Number(event.target.value));
  }

  return (
    <div className="w-50 p-3 border rounded">
      <select className="form-select" onChange={handleSelect}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownFunction;
