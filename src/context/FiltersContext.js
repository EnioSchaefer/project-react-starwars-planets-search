import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const FiltersContext = createContext();

function FiltersProvider({ children }) {
  const [nameFilter, setNameFilter] = useState('');
  const [isInputEmpty, setisInputEmpty] = useState(true);

  useEffect(() => {
    if (nameFilter.length >= 1) { setisInputEmpty(false); }
  }, [nameFilter]);

  return (
    <FiltersContext.Provider value={ { nameFilter, setNameFilter, isInputEmpty } }>
      { children }
    </FiltersContext.Provider>
  );
}

FiltersProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FiltersProvider;
