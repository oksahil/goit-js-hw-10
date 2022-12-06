import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from '/src/fetchCountries';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
export const url = 'https://restcountries.com/v3.1/name/';


export const refs = {
    input: document.querySelector('input#search-box'),
    list: document.querySelector('.country-list'),
    divInfo: document.querySelector('.country-info'),
    
}

const countriesTemplate = ({flags, name}) => {
    return `<li class="country-item list">
    <img src="${flags.svg}" width="30">
    <span class="title">${name.official}</span>
    </li>`;
}

const countrieTemplate = ({name, capital, population, flags, languages}) => {
    return `
    <p><span class="title">Capital:</span> ${capital}</p>
    <p><span class="title">Population:</span> ${population}</p>
    <p><span class="title">Languages:</span> ${Object.values(languages)}</p>
    `;
}


refs.input.addEventListener('input', debounce(fetchCountries), DEBOUNCE_DELAY);

export function render(items) {
    if (items.length > 10) {
        Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
        refs.list.innerHTML = '';
        refs.divInfo.innerHTML = '';
    } else
        if ((items.length <= 10) & (items.length >= 2)) {
            const countryList = items.map(countriesTemplate);
            refs.list.innerHTML = '';
            refs.divInfo.innerHTML = '';
            refs.list.insertAdjacentHTML('beforeend', countryList.join(''));
        } else {
        const countryList = items.map(countriesTemplate);    
        const card = items.map(countrieTemplate);
            refs.list.innerHTML = '';
            refs.divInfo.innerHTML = '';
            refs.list.insertAdjacentHTML('beforeend', countryList.join(''));
        refs.divInfo.insertAdjacentHTML('beforeend', card.join(''));
        }
}



