import Notiflix from 'notiflix';
import { render } from '/src/index';
import { refs } from '/src/index';
import { url } from '/src/index';


export let items = [];

export function fetchCountries(name) {
    name.preventDefault();
    const value = name.target.value;
    fetch(`${url}${value}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            return resp.json(); 
         
        })
        .then((data) => { 
            items = data;
            render(items);
        })
        .catch((error) => {
            Notiflix.Notify.failure(`Oops, there is no country with that name.`);
            refs.list.innerHTML = '';
            refs.divInfo.innerHTML = '';
        });
   
}; 
