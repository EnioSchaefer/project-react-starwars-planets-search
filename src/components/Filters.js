import { useContext, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';

function Filters() {
  const { nameFilter, setNameFilter,
    setComplexFilter, setIsFiltered } = useContext(FiltersContext);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  const filterByNumber = () => {
    setComplexFilter({ columnFilter, comparisonFilter, valueFilter });
    setIsFiltered(true);
  };

  return (
    <div>
      <input
        type="text"
        value={ nameFilter }
        placeholder="Pesquise por nome"
        data-testid="name-filter"
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      <form>
        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            id="column-filter"
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            onChange={ ({ target }) => setComparisonFilter(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <input
          type="number"
          value={ valueFilter }
          data-testid="value-filter"
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ filterByNumber }
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default Filters;
