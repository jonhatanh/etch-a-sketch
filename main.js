
(function () {

const screen = document.getElementById('screen');
let currentScreenSize = {
    width: 16,
    height: 16,
};

function createGrid(width, height = width) {
    screen.innerHTML = ""
    currentScreenSize.width = width;
    currentScreenSize.height = height;
    for(let i = 0; i < width; i++) {
        const newColumn = document.createElement('div')
        newColumn.classList.add('col');
        for(let j = 0; j < height; j++) {
            const newTile = document.createElement('div');
            newTile.classList.add('tile');
            newColumn.appendChild(newTile);
        }   
        screen.appendChild(newColumn);
    }
    setTilesEventListeners();
}

function setTilesEventListeners () {
    const tiles = document.getElementsByClassName('tile');
    
    for(const tile of tiles) {
        tile.addEventListener('mouseenter', (e) => {
            e.target.style.backgroundColor = 'purple';
        })
    }
}


const gridSize = document.getElementById('gridSize');
const gridSizeText = document.getElementById('gridSizeText');
gridSize.addEventListener('change', (e)=> {
    const value = e.target.value;
    gridSizeText.textContent = value;
    gridSizeText.classList.add('change');
    gridSizeText.addEventListener('transitionend', (e) => {
        gridSizeText.classList.remove('change');
    })
    createGrid(value);
})










createGrid(16);

})()