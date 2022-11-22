import { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../context/FiltersContext';
import { PlanetsContext } from '../context/PlanetsContext';

export default function PlanetsTable() {
  const { planets } = useContext(PlanetsContext);
  const { nameFilter, isInputEmpty } = useContext(FiltersContext);

  const [filteredByName, setFilteredByName] = useState([]);

  useEffect(() => {
    if (!isInputEmpty) {
      const filteredPlanets = planets
        .filter((planet) => planet.name.includes(nameFilter));
      setFilteredByName(filteredPlanets);
    }
  }, [nameFilter, isInputEmpty, planets]);

  if (planets.length === 0) return <p>Loading Planets...</p>;

  const mapPlanets = isInputEmpty ? planets : filteredByName;

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
