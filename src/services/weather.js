export async function getWeatherFrom(query = 'Buenos Aires') {
    return fetch(`/api/get-weather?q=${query}`).then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching weather: ${res.status}`);
      }
      return res.json();
    });
  }
  