import { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { PlanetsContext } from '../context/PlanetsContext';

export default function PlanetsTable() {
  const { planets } = useContext(PlanetsContext);
  const { filteredPlanets, numericFilters,
    deletingFilter, setDeletingFilter, orderPlanets } = useContext(FiltersContext);

  const [filteredNumeric, setFilteredNumeric] = useState(null);
  const [filtering, setFiltering] = useState(null);

  useEffect(() => {
    if (!deletingFilter) {
      setFiltering(filteredNumeric || filteredPlanets);
    } else {
      setFiltering(filteredPlanets);
      setFilteredNumeric(null);
    }
    numericFilters.forEach((filter) => {
      switch (filter.comparisonFilter) {
      case 'maior que':
        setFilteredNumeric(filtering
          .filter((planet) => Number(planet[filter.columnFilter]) > filter.valueFilter));
        setDeletingFilter(false);
        break;
      case 'menor que':
        setFilteredNumeric(filtering
          .filter((planet) => Number(planet[filter.columnFilter]) < filter.valueFilter));
        setDeletingFilter(false);
        break;
      case 'igual a':
        setFilteredNumeric(filtering
          .filter((planet) => planet[filter.columnFilter]
          === filter.valueFilter));
        setDeletingFilter(false);
        break;
      default:
        return 'nothing yet';
      }
    });
    if (orderPlanets) {
      const { column, sort } = orderPlanets;
      let ordered = [];
      const toOrder = filteredNumeric || filteredPlanets;
      switch (sort) {
      case 'ASC':
        ordered = toOrder
          .sort((a, b) => Number(a[column]) - Number(b[column]));
        break;
      case 'DESC':
        ordered = toOrder
          .sort((a, b) => Number(b[column]) - Number(a[column]));
        break;
      default:
        return 'nothing, I suppose';
      }
      const definedPlanets = ordered.filter((planet) => planet[column] !== 'unknown');
      const unknownPlanets = ordered.filter((planet) => planet[column] === 'unknown');
      const sortedPlanets = [...definedPlanets, ...unknownPlanets];
      setFilteredNumeric(sortedPlanets);
    }
  }, [numericFilters, filteredPlanets, setDeletingFilter,
    orderPlanets, deletingFilter, filteredNumeric, filtering]);

  if (planets.length === 0) return <p>Loading Planets...</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            { Object.keys(planets[0]).map((key, i) => (
              <th key={ i }>{ key }</th>)) }
          </tr>
        </thead>
        <tbody>
          {(filteredNumeric || filteredPlanets).map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => {
                if (i === 0) return <td key={ i } data-testid="planet-name">{value}</td>;
                return <td key={ i }>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
