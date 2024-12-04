const FETCH_OPTIONS = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '1756cba304mshaa8f0f52603c4fap1ee8a7jsnc41cb1b7c99f',
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
    },
  };
  
  export async function GET({ url }) {
    const query = url.searchParams.get('q') || 'Buenos Aires';
  
    try {
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/current.json?q=${query}`,
        FETCH_OPTIONS
      );
  
      if (!response.ok) {
        return new Response(
          JSON.stringify({
            error: `WeatherAPI returned an error: ${response.statusText}`,
          }),
          { status: response.status }
        );
      }
  
      const data = await response.json();
      const { location, current } = data;
      const { country, localtime, name } = location;
      const {
        condition,
        humidity,
        feelslike_c,
        is_day,
        temp_c,
        wind_kph,
        wind_dir,
      } = current;
      const { text, icon } = condition;
  
      const body = {
        conditionText: text,
        conditionIcon: icon,
        country,
        localtime,
        locationName: name,
        humidity,
        is_day,
        feelsLike: feelslike_c,
        temperature: temp_c,
        windSpeed: wind_kph,
        windDir: wind_dir,
      };
  
      return new Response(JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch weather data',
          details: error.message,
        }),
        { status: 500 }
      );
    }
  }
  