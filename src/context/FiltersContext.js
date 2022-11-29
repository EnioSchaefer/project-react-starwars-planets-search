import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PlanetsContext } from './PlanetsContext';

export const FiltersContext = createContext();

function FiltersProvider({ children }) {
  const { planets } = useContext(PlanetsContext);

  const [deletingFilter, setDeletingFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [numericFilters, setNumericFilters] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterOptions, setFilterOptions] = useState([
    { option: 'population', available: true },
    { option: 'orbital_period', available: true },
    { option: 'diameter', available: true },
    { option: 'rotation_period', available: true },
    { option: 'surface_water', available: true },
  ]);

  useEffect(() => {
    if (nameFilter.length > 0) {
      setFilteredPlanets(planets.filter((planet) => planet.name.includes(nameFilter)));
    } else if (nameFilter.length === 0) {
      setFilteredPlanets(planets);
    }
  }, [nameFilter, planets]);

  return (
    <FiltersContext.Provider
      value={ {
        nameFilter,
        setNameFilter,
        filteredPlanets,
        numericFilters,
        setNumericFilters,
        filterOptions,
        setFilterOptions,
        deletingFilter,
        setDeletingFilter,
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
