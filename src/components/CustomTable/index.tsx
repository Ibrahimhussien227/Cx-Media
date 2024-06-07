

import React from 'react';
import { ICustomTableProps } from './types';



const CustomTable = <T,>({ columns, data, children}: ICustomTableProps<T>) => {
  

  return (
    <div className='overflow-y-auto	lg:overflow-visible'>
    <table className="border-separate border-spacing-y-[1rem] w-full">
      <thead>
        <tr className="bg-[#5A6A93] rounded-md">
          {columns.map((header, idx) => (
            <th
              key={idx}
              className={`uppercase p-2.5 text-[10px] tracking-widest ${idx === 0? 'text-left': idx === columns.length - 1? 'text-right': 'text-center'}`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <React.Fragment key={index}>{children(row)}</React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default CustomTable;
