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
    if (isInputEmpty) {
      setFilteredByName(planets);
    } else {
      setFilteredByName(planets.filter((planet) => planet.name.includes(nameFilter)));
    }

    if (isFiltered) {
      const { columnFilter, comparisonFilter, valueFilter } = complexFilter;
      const mapPlanets = Object.keys(filteredComplex).length > 0
        ? filteredComplex : filteredByName;

      switch (comparisonFilter) {
      case 'maior que':
        setFilteredComplex(mapPlanets
          .filter((planet) => planet[columnFilter] > Number(valueFilter)));
        break;
      case 'menor que':
        setFilteredComplex(mapPlanets
          .filter((planet) => planet[columnFilter] < Number(valueFilter)));
        break;
      case 'igual a':
        setFilteredComplex(mapPlanets
          .filter((planet) => planet[columnFilter] === valueFilter));
        break;
      default:
        setFilteredComplex('lint obligates me to put this useless default');
      }
    }
  }, [nameFilter, isInputEmpty, planets, complexFilter,
    isFiltered, filteredByName, filteredComplex]);

  const mapPlanets = isFiltered ? filteredComplex : filteredByName;

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
