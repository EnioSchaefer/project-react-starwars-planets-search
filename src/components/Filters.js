import { useContext } from 'react';
import { FiltersContext } from '../context/FiltersContext';

function Filters() {
  const { nameFilter, setNameFilter } = useContext(FiltersContext);

  return (
    <form>
      <div>
        <input
          type="text"
          value={ nameFilter }
          data-testid="name-filter"
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </div>
    </form>
  );
}

export default Filters;
