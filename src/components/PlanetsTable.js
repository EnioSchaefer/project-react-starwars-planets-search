import { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { PlanetsContext } from '../context/PlanetsContext';

export default function PlanetsTable() {
  const { planets } = useContext(PlanetsContext);
  const { filteredPlanets, numericFilters } = useContext(FiltersContext);

  const [filteredNumeric, setFilteredNumeric] = useState(null);

  useEffect(() => {
    const filtering = filteredNumeric || filteredPlanets;
    numericFilters.forEach((filter) => {
      switch (filter.comparisonFilter) {
      case 'maior que':
        setFilteredNumeric(filtering
          .filter((planet) => Number(planet[filter.columnFilter]) > filter.valueFilter));
        break;
      case 'menor que':
        setFilteredNumeric(filtering
          .filter((planet) => Number(planet[filter.columnFilter]) < filter.valueFilter));
        break;
      case 'igual a':
        setFilteredNumeric(filtering
          .filter((planet) => planet[filter.columnFilter]
          === filter.valueFilter));
        break;
      default:
        return 'nothing yet';
      }
    });
  }, [numericFilters, filteredPlanets]);

  if (planets.length === 0) return <p>Loading Planets...</p>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            { Object.keys(planets[0]).map((key, i) => (<th key={ i }>{ key }</th>)) }
          </tr>
        </thead>
        <tbody>
          {(filteredNumeric || filteredPlanets).map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => <td key={ i }>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
