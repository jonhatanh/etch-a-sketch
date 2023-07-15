
(function () {

const screen = document.getElementById('screen');
let currentScreenSize = {
    width: 16,
    height: 16,
};
let currentColor = {
    hex: "#000",
    opacity: 1,
    getOpacity() {
        const hexValue = (this.opacity).toString(16);
        return `${hexValue}${hexValue}`
    },
};
let hoverActive = false;
let opacityActive = false;

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

const hoverText = document.getElementById('hoverText');
screen.addEventListener('click', (e) => {
    if(hoverActive) {
        hoverActive = !hoverActive;
    } else {
        hoverActive = !hoverActive;
        paintTile(e)
    }
    hoverText.innerText = hoverText.innerText === "OFF" ? "ON" : "OFF";
})

function setTilesEventListeners () {
    const tiles = document.getElementsByClassName('tile');
    
    for(const tile of tiles) {
        tile.addEventListener('mouseenter', paintTile);
    }
}
function paintTile(e) {
    if(!e.target.classList.contains('tile')) return;
    if(!hoverActive) return;
    if(opacityActive) {

        // `rgba(
        //     ${currentColor.red},
        //     ${currentColor.green},
        //     ${currentColor.blue},
        //     ${currentColor.alpha}
        //     )
    } else {
        e.target.style.backgroundColor = currentColor.hex;
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

const leftButton = document.querySelector('.container-button.left')
const colorInput = document.getElementById('colorInput');
colorInput.addEventListener('input', (e) => {
    currentColor.hex = e.target.value;
    leftButton.style.backgroundColor = e.target.value;
})

function addOpacity(color, opacityValue = 2) {
    currentColor.opacity += opacityValue; 
}


function randomHex() {
    return "#000000".replace(/0/g, ()=> (~~(Math.random()*16)).toString(16));
}






createGrid(16);

})()