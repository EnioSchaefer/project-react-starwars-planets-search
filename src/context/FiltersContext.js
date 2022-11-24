import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const FiltersContext = createContext();

function FiltersProvider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [isInputEmpty, setisInputEmpty] = useState(true);
  const [complexFilter, setComplexFilter] = useState({});
  const [isFiltered, setIsFiltered] = useState(false);
  const [allFilters, setAllFilters] = useState([]);

  useEffect(() => {
    if (nameFilter.length > 0) { setisInputEmpty(false); }
  }, [nameFilter]);

  return (
    <FiltersContext.Provider
      value={ {
        nameFilter,
        setNameFilter,
        isInputEmpty,
        complexFilter,
        setComplexFilter,
        isFiltered,
        setIsFiltered,
        allFilters,
        setAllFilters,
      } }
    >
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FiltersProvider;
