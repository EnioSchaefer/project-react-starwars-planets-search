import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const fetchPlanets = async () => {
    try {
      const fetchData = await fetch('https://swapi.dev/api/planets');
      const response = await fetchData.json();
      const rawData = response.results;
      const data = rawData.map((planet) => {
        delete planet.residents;
        return planet;
      });
      console.log(data);
      setPlanets(data);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

  useEffect(() => { fetchPlanets(); }, []);

  return (
    <PlanetsContext.Provider value={ { planets } }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlanetsProvider;
