async function fetchPlanets() {
  const fetchData = await fetch('https://swapi.dev/api/planets');
  const response = await fetchData.json();
  const rawData = response.results;
  const data = rawData.map((planet) => {
    delete planet.residents;
    return planet;
  });
  console.log(data);
  return data;
}

export default fetchPlanets;
