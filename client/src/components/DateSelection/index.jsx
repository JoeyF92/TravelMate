import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DateSelection = ({ selected, onChange }) => {
  return (
    <div>
      <DatePicker
        selected={selected}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
        wrapperClassName="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm"
      />
    </div>
  );
};

export default DateSelection;
