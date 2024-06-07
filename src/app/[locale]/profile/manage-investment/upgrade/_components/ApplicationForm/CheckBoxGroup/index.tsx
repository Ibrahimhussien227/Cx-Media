"use client";

import React, { useState } from "react";

const CheckBoxGroup = () => {
  const [check, setCheck] = useState<number>(0);
  return (
    <div className="flex flex-row gap-5 ml-2">
      <div className="flex flex-row text-[12px]">
        {/* Checkbox */}
        <div className="checkbox-container" onClick={() => setCheck(1)}>
          <input type="checkbox" disabled={false} checked={check === 1} />
          <label>Yes</label>
        </div>
      </div>
      <div className="flex flex-row text-[12px]">
        {/* Checkbox */}
        <div className="checkbox-container" onClick={() => setCheck(2)}>
          <input type="checkbox" disabled={false} checked={check === 2} />
          <label>No</label>
        </div>
      </div>
    </div>
  );
};
export default CheckBoxGroup;
