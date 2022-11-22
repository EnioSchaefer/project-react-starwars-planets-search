import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  // const [isLoading, setisLoading] = useState(false);

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
      throw new Error(e);
    }
  };

  useEffect(() => { fetchPlanets(); }, []);

  return (
    <AuthContext.Provider value={ { planets } }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AuthProvider;
