const container = document.querySelector('.container');
const countryInfoContainer = document.querySelector('.countryInfoContainer');
const input = document.querySelector('.searchContainer input');
const searchBtn = document.querySelector('.searchBtn');
const flagImg = document.getElementById('flag');
const countryName = document.getElementById('countryName');
const capital = document.querySelector('.capital span');
const continent = document.querySelector('.continent span');
const population = document.querySelector('.population span');
const currency = document.querySelector('.currency span');
const language = document.querySelector('.language span');
const errorText = document.querySelector('.error');
const apiKey = 'tYKXvgZrUHD44bwGnoSnvGUARBg8VouD5ostjeO1';

//  GET COUNTRY FUNCTION AND API
function getCountry() {
    let country = input.value;

    if (country) {
        const api = `https://countryapi.io/api/name/${country}?apikey=${apiKey}`;
        getData(api);
    }
}

// SHOW ERROR
function showError() {
    const errorCounty = input.value;
    errorText.style.display = 'block';
    errorText.innerHTML = `"${errorCounty}" Is Not A Country Type Again!`;
}

//GET DATA
async function getData(link) {
    try {
        const response = await fetch(link);
        if (response.status === 404) {
            countryInfoContainer.style.display = 'none';
            container.style.display = 'block';
            setTimeout(() => {
                container.style.width = '380px';
            }, 100);
            setTimeout(() => {
                showError();
                container.style.height = '120px';
            }, 300);
        } else {
            const data = await response.json();
            const curr = Object.values(data)[0].currencies;
            const currName = Object.values(curr)[0].name;
            const currSymbol = Object.values(curr)[0].symbol;
            const lang = Object.values(data)[0].languages;
            const langName = Object.values(lang)[0];

            container.style.width = '400px';
            setTimeout(() => {
                container.style.height = '550px';
            }, 500);
            setTimeout(() => {
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.justifyContent = 'space-between';
                container.style.alignItems = 'center';
                countryInfoContainer.style.display = 'block';
            }, 1000);
            errorText.style.display = 'none';
            flagImg.src = Object.values(data)[0].flag.medium;
            countryName.innerHTML = Object.values(data)[0].name;
            continent.innerHTML = Object.values(data)[0].region;
            population.innerHTML = Object.values(data)[0].population;
            capital.innerHTML = Object.values(data)[0].capital;
            currency.innerHTML = `${currName} - ${currSymbol} `;
            language.innerHTML = langName;
        }
    } catch (error) {
        alert(error.message);
    }
}

// CLICK ON SEARCH BTN AND GET COUNTRY
searchBtn.addEventListener('click', getCountry);

// PRESS ON ENTREE KEY AND GET COUNTRY
input.addEventListener('keypress', e => {
    if (e.key === 'Enter') getCountry();
    errorText.style.display = 'none';
});
