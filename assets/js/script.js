// import jsonFile2 from './assets/json/movies.json' assert {type: 'json'};
let jsonFile2 = 'https://api.themoviedb.org/3/movie/popular?api_key=d027898faf2f10635c81f2e00ec9e57d&language=fr-FR&page=1';
let jsonFile = './assets/json/movies.json';
let selectBloc = document.getElementById('insideData');
let selectMovieCards = document.querySelectorAll('.movieCards');
let footerSelect = document.querySelector('footer')
//import myJson from '../json/movies.json' assert {type: 'json'}; Astuce de Stéphane
// Je garde le loading pendant au moin 3s, what ever puis si load, alors gogo
window.addEventListener('load', () => {
    setTimeout(() => {
    loadingDiv.style.display = 'none';
    insideData.style.display = 'flex';
    titleTMMDB.classList.add('movieCardsAnimate');
    containerDM.classList.add('miniScale');
    footerSelect.classList.add('movieCardsAnimate');
    }, 2000);
}); 
    fetch(jsonFile2)
    .then(response => response.json())
    .then(json => {
        json.results.forEach((movie, index) => {
            let cuttedOverview = movie.overview
            // Si le nom ou la description est trop long(ue) alors cut et ajoute (...) +d'infos
            if (movie.title.length > 30 && movie.overview.length > 47) {
                cuttedOverview = cuttedOverview.substring(0, 46) + `... <span class="btnInfo" id="${movie.id}">+d'infos</span>`;
            } else if (movie.title.length > 16 && movie.overview.length > 75) {
                cuttedOverview = cuttedOverview.substring(0, 80) + `... <span class="btnInfo" id="${movie.id}">+d'infos</span>`;
            } else if (movie.overview.length > 101) {
                cuttedOverview = cuttedOverview.substring(0, 90) + `... <span class="btnInfo" id="${movie.id}">+d'infos</span>`;
            }
            //si c'est pas trop long utilise la description complète
            let starsNote = '';
            let voteAvrg = movie.vote_average / 2;
            let nbrOfStarsToShow = Math.round(voteAvrg);
            for (let i = 0; i < nbrOfStarsToShow; i++) {
                starsNote += '☆';
            }
            let posterCustomPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            selectBloc.innerHTML +=
                `
            <div class="movieCards">
                <div class="posterImgCnt">
                    <img class="posterImg" src="${posterCustomPath}"></img>
                </div>
                <div class="movieDescr">
                    <h2>${movie.title}</h2>
                    <p>${cuttedOverview}</p>
                    <span>${starsNote}</span>
                </div>
            </div>
            `;

            // ajout de la class pour l'animation avec 250 ms de delay
            let j = 1500;
            let selectMovieCards = document.querySelectorAll('.movieCards');
            selectMovieCards.forEach(element => {
                setTimeout( () => { 
                    element.classList.add('movieCardsAnimate');
                }, j)
                j+= 250;
            });
            // Fin des ajouts de class pour les cards                       
        });
        // fin du json for each
        // selection des TOUTS les "buttons" +d'infos
        let btnSelect = document.querySelectorAll('.btnInfo');
        // quand je clique, affiche une modal avec ... titreModal + descrModal
            btnSelect.forEach(element1 => {
                element1.addEventListener('click', () => {
                    json.results.forEach(element2 => {
                        if (element2.id == element1.id) {
                            let titleModal = element2.original_title;
                            let descrModal = element2.overview;
                            modalContent.innerHTML = 
                            `
                            <span id="closeModal">&times;</span>
                            <h2>${titleModal}</h2>
                            <hr>
                            <p>${descrModal}</p>
                            `;
                        }
                    });
                    modal.style.display = 'block';
                    closeModal.addEventListener('click', () => {
                        modal.style.display = 'none';
                    })
                })
            });
            //fin de la fonction des modales quand la description est trop longue
            
            //darkMode
            checkbox.addEventListener('change', ev => {
            let body = document.querySelector('body');
            let borderSelector = document.querySelectorAll('.movieCards');
            let txtSelector = document.querySelectorAll('p, h1, h2, span');
            if (ev.target.checked == false) {
                borderSelector.forEach(element => {
                    element.style.borderColor = 'black';
                })
                txtSelector.forEach(element => {
                    element.style.color = 'black';
                });
            body.style.backgroundColor = 'white';
            } else {
                borderSelector.forEach(element => {
                    element.style.borderColor = 'white';
                })
                txtSelector.forEach(element => {
                    element.style.color = 'white';
                });
                copyright.style.color = 'black';
                body.style.backgroundColor = 'black';
                titleTMMDB.style.color = 'chocolate';
            }
        })    
    });









