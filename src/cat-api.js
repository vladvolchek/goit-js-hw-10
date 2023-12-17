import axios from 'axios';
import Notiflix from 'notiflix';
export { fetchBreeds, fetchCatByBreed };
axios.defaults.headers.common['x-api-key'] = 'live_EpI2AskpjZzqbKW98a5jHFm0nA93wyK3gOJynaFbNtCzvLqwZ5bLdT6rWOxQXJn0';


function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data)
        
};


function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            Notiflix.Loading.hourglass('Завантаження'); 
            return response.data
        })
        .finally(()=>{
            Notiflix.Loading.remove();
        } )
        
}