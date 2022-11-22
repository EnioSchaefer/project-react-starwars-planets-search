import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function PlanetsTable() {
  const { planets } = useContext(AuthContext);

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
