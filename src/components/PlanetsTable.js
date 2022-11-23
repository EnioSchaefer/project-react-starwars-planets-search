import { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { PlanetsContext } from '../context/PlanetsContext';

export default function PlanetsTable() {
  const { planets } = useContext(PlanetsContext);
  const { nameFilter, isInputEmpty,
    complexFilter, isFiltered } = useContext(FiltersContext);

  const [filteredByName, setFilteredByName] = useState([]);
  const [filteredComplex, setFilteredComplex] = useState([]);

  useEffect(() => {
    if (!isInputEmpty) {
      const filteredPlanets = planets
        .filter((planet) => planet.name.includes(nameFilter));
      setFilteredByName(filteredPlanets);
    }

    if (isFiltered) {
      const { columnFilter, comparisonFilter, valueFilter } = complexFilter;
      switch (comparisonFilter) {
      case 'maior que':
        setFilteredComplex(planets
          .filter((planet) => planet[columnFilter] > Number(valueFilter)));
        break;
      case 'menor que':
        setFilteredComplex(planets
          .filter((planet) => planet[columnFilter] < Number(valueFilter)));
        break;
      case 'igual a':
        setFilteredComplex(planets
          .filter((planet) => planet[columnFilter] === valueFilter));
        break;
      default:
        setFilteredComplex(returnedPlanets);
      }
    }
  }, [nameFilter, isInputEmpty, planets, complexFilter, isFiltered]);

  const checkFilters = () => {
    if (isFiltered) return filteredComplex;
    if (!isInputEmpty) {
      if (isFiltered) return filteredComplex;
      return filteredByName;
    }
    return planets;
  };

  const mapPlanets = checkFilters();

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
          {mapPlanets.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => <td key={ i }>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
