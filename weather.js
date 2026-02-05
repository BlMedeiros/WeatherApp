async function fetchTemperature(location) {
    
    const url = `https://api.weatherapi.com/v1/forecast.json?key=d598968df95c40538cc213327251212&q=${location}&days=3&lang=pt`;
    const temperature = document.getElementById("temperature");
    const climate = document.getElementById("climate")
    const image_icon = document.getElementById("icon")

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();

        })
        .then(data => {
            let temperatureData = data.current.temp_c;
            let climateData = data.current.condition.text;
            let imageSource = data.current.condition.icon;

            temperature.innerText = `${Math.round(temperatureData)}°C`;
            climate.textContent = climateData;
            image_icon.src = imageSource

            getForecastData(data)

            console.log(data)

            addHistory(data.location.name)
        })
        .catch(error => console.log(error));

    (error) => {
        console.error("Falha ao obter Geolocation. Verifique as permissões do navegador:", error.message);
    }
}

function getCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve(`${latitude},${longitude}`);
            },
            (error) => {
                reject(error);
            }
        );
    });
}

function getLocation() {
    const inputElement = document.getElementById('textoBox');
    
    if (inputElement) {
        const locationValue = inputElement.value || inputElement.textContent;
        return locationValue.toLocaleLowerCase();
    } else {
        console.error("Erro: Elemento com ID 'textBox' não encontrado no DOM.");
        return ""; 
    }
}

async function getLocationByIp() {
    try {
        return await getCoordinates();
    } catch (err) {
        console.warn("Fallback para IP:", err);
        return "auto:ip";
    }
}

async function executeWeatherFlow(strategy) {
   try {
            let location;

        if (strategy === "search") {
            location = getLocation();
        } else if (strategy === "current") {
            location = await getLocationByIp();
        }

        if (location) {
            await fetchTemperature(location);
        }
   }catch(error) {
        console.error("Erro no fluxo:", error);
   }
}

function getForecastData(data) {
    const days = data.forecast.forecastday;

    days.forEach((dayData, index) => {
        const container = document.getElementById(`dia-${index + 1}`);
        
        if (container) {
            const iconUrl = "https:" + dayData.day.condition.icon;
            const avgTemp = dayData.day.avgtemp_c;

            container.querySelector('img').src = iconUrl;
            container.querySelector('p').innerText = `${Math.round(avgTemp)}°C`;
        }
    });
}

const searchButton = document.getElementById('searchButton');
const actualLocationButton = document.getElementById('actualLocationButton');

searchButton.addEventListener('click', async () => {
    executeWeatherFlow("search");
});

actualLocationButton.addEventListener('click', async() => {
     executeWeatherFlow("current");
});