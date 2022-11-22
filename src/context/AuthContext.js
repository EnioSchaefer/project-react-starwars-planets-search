import { createContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={ { planets: [] } }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
