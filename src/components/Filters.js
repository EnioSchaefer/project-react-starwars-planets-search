import { useContext, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';

function Filters() {
  const { nameFilter, setNameFilter, numericFilters,
    setNumericFilters, filterOptions, setFilterOptions } = useContext(FiltersContext);

  const availableFilters = () => filterOptions
    .filter((filter) => (filter.available));
  console.log(availableFilters());

  const [columnFilter, setColumnFilter] = useState(availableFilters()[0].option);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterID, setFilterID] = useState(0);

  const filterByNumber = () => {
    const newFilter = {
      columnFilter,
      comparisonFilter,
      valueFilter,
      id: filterID };
    console.log(newFilter);
    setFilterID(filterID + 1);
    setNumericFilters([...numericFilters, newFilter]);

    const newFilterOptions = filterOptions.map((filter) => {
      if (filter.option === columnFilter) filter.available = false;
      return filter;
    });
    setFilterOptions(newFilterOptions);
    setColumnFilter(availableFilters()[0].option);
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
            {filterOptions.map((filtOpt) => filtOpt.available && (
              <option
                value={ filtOpt.option }
                key={ filtOpt.option }
              >
                {filtOpt.option}
              </option>))}
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
      <div>
        {numericFilters.map((filter, i) => (
          <div key={ i }>
            <span>
              { `${filter.columnFilter} 
              ${filter.comparisonFilter} 
              ${filter.valueFilter}` }
            </span>
            <button type="button">Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filters;
