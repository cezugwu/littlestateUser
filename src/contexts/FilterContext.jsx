import React, { createContext, useRef, useState } from 'react';
import Cookies from "js-cookie";


export const FilterContext = createContext();

const FilterProvider = ({children}) => {
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState(false);
  const [sorts, setSorts] = useState(() => Cookies.get('sort') || '');

  const filterRef = useRef();


  return(
    <FilterContext.Provider value={{filter, setFilter, sort, setSort, sorts, setSorts, filterRef}}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
