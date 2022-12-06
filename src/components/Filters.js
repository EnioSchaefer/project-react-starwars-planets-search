import { useContext, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';

function Filters() {
  const { nameFilter, setNameFilter, numericFilters,
    setNumericFilters, filterOptions, setFilterOptions,
    setDeletingFilter, setOrderPlanets } = useContext(FiltersContext);

  const availableFilters = () => filterOptions
    .filter((filter) => (filter.available));

  const [columnFilter, setColumnFilter] = useState(availableFilters()[0].option);
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filterID, setFilterID] = useState(0);
  const [orderColumn, setOrderColumn] = useState('population');
  const [ascOrDesc, setAscOrDesc] = useState(null);

  const filterByNumber = () => {
    const newFilter = {
      columnFilter,
      comparisonFilter,
      valueFilter,
      id: filterID };
    setFilterID(filterID + 1);
    setNumericFilters([...numericFilters, newFilter]);

    const newFilterOptions = filterOptions.map((filter) => {
      if (filter.option === columnFilter) filter.available = false;
      return filter;
    });
    setFilterOptions(newFilterOptions);
    setColumnFilter(availableFilters()[0].option);
  };

  const removeFilter = (filterToDelete) => {
    setDeletingFilter(true);
    setNumericFilters(numericFilters
      .filter((filter) => filter.columnFilter !== filterToDelete));
  };

  const orderByColumn = () => {
    const sorting = { column: orderColumn, sort: ascOrDesc };
    setOrderPlanets(sorting);
  };

  const canOrder = !ascOrDesc;

  return (
    <div>
      <input
        type="text"
        value={ nameFilter }
        placeholder="Pesquise por nome"
        data-testid="name-filter"
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      <div>
        <label htmlFor="select-order">
          Ordenar:
          <select
            id="select-order"
            data-testid="column-sort"
            onChange={ ({ target }) => setOrderColumn(target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="radio-order-asc">
          Ascendente
          <input
            type="radio"
            name="radio-order"
            data-testid="column-sort-input-asc"
            value="ASC"
            id="radio-order-asc"
            onChange={ ({ target }) => setAscOrDesc(target.value) }
          />
        </label>
        <label htmlFor="radio-order-desc">
          Descendente
          <input
            type="radio"
            name="radio-order"
            data-testid="column-sort-input-desc"
            value="DESC"
            id="radio-order-desc"
            onChange={ ({ target }) => setAscOrDesc(target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          disabled={ canOrder }
          onClick={ orderByColumn }
        >
          Ordenar
        </button>
      </div>
      <div>
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
      </div>
      <div>
        {numericFilters.map((filter, i) => (
          <div key={ i } data-testid="filter">
            <span>
              { `${filter.columnFilter} 
              ${filter.comparisonFilter} 
              ${filter.valueFilter}` }
            </span>
            <button
              type="button"
              onClick={ () => removeFilter(filter.columnFilter) }
            >
              Remover
            </button>
          </div>
        ))}
        {numericFilters.length > 0 && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => {
              setNumericFilters([]);
              setDeletingFilter(true);
            } }
          >
            Remover Filtros
          </button>)}
      </div>
    </div>
  );
}

export default Filters;
