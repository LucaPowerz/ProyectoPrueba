import Champion from './Champion.js';

var champions = [];

// Selecciona el botón para cargar campeones
const button = document.querySelector("button");

button.addEventListener("click", () => {
    document.querySelector('#button').style.visibility = 'hidden';
    document.querySelector('#lols').style.visibility = 'visible';
    startLol();
});

const startLol = async () => {
    const data = await fetch("https://ddragon.leagueoflegends.com/cdn/13.18.1/data/es_ES/champion.json")
        .then(result => result.json());
    const array = data.data;
    
    Object.entries(array).forEach(([name, champion]) => {
      const champ = new Champion(champion);
        pushChampion(champ);
    });

    await showLol();
};

function pushChampion(champion) {
    champions.push(champion);
}

const showLol = async () => {
    const lols = document.getElementById("lols");
    
    for (let i = 0; i < champions.length; i++) {
        lols.innerHTML += `
            <div class="card" onclick="showInfo(${i})">
                ${champions[i].name}<br>
            
                <img class="img" src="${champions[i].full}" alt="${champions[i].name}">
                <div class="desc">${champions[i].title}</div>
            </div>`;
    }
};

// Crear modal si no existe
const createModal = () => {
    const modalHTML = `
        <div id="championModal" class="modal">
            <div class="modal-content">
                
                <img id="modalChampionImage" src="" alt="">
                <div class="info">
                <span class="close">&times;</span>
                <h2 id="modalChampionName"></h2>
                
                <strong style="color:white" class="champdesc">Descripción:</strong>
                <p id="modalChampionDescription" style="color:white"></p>
                
            </div></div>
        </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
};

// Crear el modal y asignar la variable
createModal();
const modal = document.getElementById("championModal");
const span = document.getElementsByClassName("close")[0];

window.showInfo = (index) => {
    const champion = champions[index];

    // Actualizar los contenidos del modal
    document.getElementById("modalChampionName").textContent = champion.name;
    document.getElementById("modalChampionImage").src = champion.full;
    document.getElementById("modalChampionDescription").textContent = champion.desc;
    modal.style.display = "flex";

};

// Cerrar el modal al hacer clic en el <span> (x)
span.onclick = function() {
    modal.style.display = "none";
}

// Cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}