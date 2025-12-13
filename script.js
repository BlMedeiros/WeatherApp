async function fetchTemperature(location) {
    const url = `http://api.weatherapi.com/v1/current.json?key=d598968df95c40538cc213327251212&q=${location}`;
    const temperature = document.getElementById("temperature");

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }
            return response.json();

        })
        .then(data => {
            const temperatureData = data.current.temp_c;
            
            temperature.textContent = temperatureData;

            console.log(data)
        })
        .catch(error => console.log(error));

    (error) => {
        console.error("Falha ao obter Geolocation. Verifique as permissões do navegador:", error.message);
    }
}

function getCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        return `${latitude},${longitude}`
    });
}

function getLocation() {
    const inputElement = document.getElementById('textoBox');
    
    // ** CORREÇÃO AQUI: Verifica se o elemento foi encontrado **
    if (inputElement) {
        // Se o elemento existe, você pode ler as propriedades
        const locationValue = inputElement.value || inputElement.textContent;
        return locationValue.toLocaleLowerCase();
    } else {
        // Se o elemento não existe (ID incorreto ou HTML ainda não carregado)
        console.error("Erro: Elemento com ID 'textBox' não encontrado no DOM.");
        // Retorna uma string vazia para evitar que a busca na API ocorra
        return ""; 
    }
}

const searchButton = document.getElementById('searchButton');
const actualLocationButton = document.getElementById('actualLocationButton');

searchButton.addEventListener('click', async () => {
    const location = getLocation();
    
    if (location) {
        await fetchTemperature(location);
    }
});

actualLocationButton.addEventListener('click', async() => {
    const coordinates = getCoordinates

    if(coordinates) {
        await fetchTemperature(coordinates)
    }
});