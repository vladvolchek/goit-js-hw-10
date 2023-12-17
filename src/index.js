import Notiflix from "notiflix";
import SlimSelect from "slim-select";
import { fetchBreeds, fetchCatByBreed } from './cat-api';


const container = document.querySelector('.breed-select');
const load = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');


container.style.visibility = 'hidden';
error.style.display = 'none';


fetchBreeds()
    .then(breeds => {
        container.style.visibility = 'visible';
        load.style.display = 'none';
        

        const cat = breeds.map(breed =>
            `<option value="${breed.id}">${breed.name}</option>`).join('');

        container.insertAdjacentHTML('beforeend', cat);
    })
    .catch(error => {
        console.log(error);
        
        Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!');

       
    });


container.addEventListener('change', handleChange);


function handleChange() {
    
    catInfo.innerHTML = '';
    const selectedBreed = this.value;


    load.style.display = 'block';

    fetchCatByBreed(selectedBreed)
        .then(cat => { 

            
        const url = cat[0].url;
        const name = cat[0].breeds[0].name;
        const description = cat[0].breeds[0].description;
        const temperament = cat[0].breeds[0].temperament;


        catInfo.innerHTML = `
        <div><img src="${url}" alt="${name}" width="400"></div>
        <div>
        <h3>${name}</h3>
        <p>Description: ${description}</p>
        <p>Temperament: ${temperament}</p>
        </div>
            `;
            load.style.display = 'none';
            Notiflix.Loading.remove(1100)
        })
        .catch(error => {
            Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!', String(error), "Okay");
        });
        
    }