// import jsonFile2 from './assets/json/movies.json' assert {type: 'json'};
let jsonFile = './assets/json/movies.json';
let selectBloc = document.getElementById('insideData');

//import myJson from '../json/movies.json' assert {type: 'json'}; Astuce de Stéphane
// console.log(jsonFile2);
fetch(jsonFile)
    .then(response => response.json())
    .then(json => {
        json.results.forEach(movie => {
            let cuttedOverview = movie.overview
            if (movie.overview.length > 101) {
                cuttedOverview = cuttedOverview.substring(0, 100) + '...';
            }
            let starsNote = '';
            let voteAvrg = movie.vote_average / 2;
            let nbrOfStarsToShow = Math.round(voteAvrg);
            for (let i = 0; i < nbrOfStarsToShow; i++) {
                starsNote += '☆';
            }
            selectBloc.innerHTML +=
                `
            <div class="movieCards">
                <div class="fakeImgBg">
                    <img class="posterImg" src="${movie.poster_path}"></img>
                </div>
                <div class="movieDescr">
                    <h2>${movie.original_title}</h2>
                    <p>${cuttedOverview}</p>
                    <span>${starsNote}</span>
                </div>
            </div>
            `;
        });
    });