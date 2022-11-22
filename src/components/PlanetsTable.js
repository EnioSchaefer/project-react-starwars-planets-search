import { useState, useEffect } from 'react';
import fetchPlanets from '../services/fetchPlanets';

export default function PlanetsTable() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function getPlanets() {
      const planetsList = await fetchPlanets();
      setPlanets(planetsList);
    }
    getPlanets();
  }, []);
  if (planets.length === 0) return <p>Loading...</p>;
  return (
    <div>
      <table>
        <thead>
          <tr>
            { Object.keys(planets[0]).map((key, i) => (<th key={ i }>{ key }</th>)) }
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((value, i) => <td key={ i }>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
