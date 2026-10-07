const cidades = [

    {

        nome: "Americana",

        id: "americana",

        latitude: -22.74,

        longitude: -47.33

    },

    {

        nome: "Santa Bárbara d'Oeste",

        id: "santa-barbara",

        latitude: -22.75,

        longitude: -47.41

    },

    {

        nome: "Nova Odessa",

        id: "nova-odessa",

        latitude: -22.78,

        longitude: -47.29

    },

    {

        nome: "Sumaré",

        id: "sumare",

        latitude: -22.82,

        longitude: -47.27

    },

    {

        nome: "Limeira",

        id: "limeira",

        latitude: -22.56,

        longitude: -47.40

    }

];


function interpretarClima(codigo) {

    if (codigo === 0) {

        return ["☀️", "Céu limpo"];

    }

    if (codigo === 1 || codigo === 2) {

        return ["🌤️", "Parcialmente nublado"];

    }

    if (codigo === 3) {

        return ["☁️", "Nublado"];

    }

    if (codigo === 45 || codigo === 48) {

        return ["🌫️", "Neblina"];

    }

    if (codigo >= 51 && codigo <= 57) {

        return ["🌦️", "Garoa"];

    }

    if (codigo >= 61 && codigo <= 67) {

        return ["🌧️", "Chuva"];

    }

    if (codigo >= 80 && codigo <= 82) {

        return ["🌦️", "Pancadas de chuva"];

    }

    if (codigo >= 95) {

        return ["⛈️", "Tempestade"];

    }

    return ["🌤️", "Tempo variável"];

}


async function carregarClima(cidade) {

    const url =

        `https://api.open-meteo.com/v1/forecast` +

        `?latitude=${cidade.latitude}` +

        `&longitude=${cidade.longitude}` +

        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +

        `&timezone=America%2FSao_Paulo`;

    try {

        const resposta = await fetch(url);

        const dados = await resposta.json();

        const atual = dados.current;

        const clima = interpretarClima(atual.weather_code);


        document.getElementById(

            `icone-${cidade.id}`

        ).textContent = clima[0];


        document.getElementById(

            `descricao-${cidade.id}`

        ).textContent = clima[1];


        document.getElementById(

            `temp-${cidade.id}`

        ).textContent =

            `${Math.round(atual.temperature_2m)}°C`;


        document.getElementById(

            `umidade-${cidade.id}`

        ).textContent =

            `${atual.relative_humidity_2m}%`;


        document.getElementById(

            `sensacao-${cidade.id}`

        ).textContent =

            `${Math.round(atual.apparent_temperature)}°C`;


        document.getElementById(

            `vento-${cidade.id}`

        ).textContent =

            `${Math.round(atual.wind_speed_10m)} km/h`;

    }

    catch (erro) {

        document.getElementById(

            `descricao-${cidade.id}`

        ).textContent = "Não foi possível carregar o clima.";

        console.error(erro);

    }

}


cidades.forEach(carregarClima);
 