
(function () {

const screen = document.getElementById('screen');
let currentScreenSize = {
    width: 16,
    height: 16,
};
let currentColor = {
    hex: "#000000",
};
let hoverActive = false;
let shaddingActive = false;
let rainbowActive = false;

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
    if(rainbowActive) {
        e.target.style.backgroundColor = getRandomHex();
        return;
    }
    if(shaddingActive) {
        const newColor = getNewColor(e.target);
        console.log('newColor:', newColor);
        e.target.style.backgroundColor = newColor;
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
    console.log(e.target.value);
})


function getNewColor(tile) {
    let arrayColorsInt = getRgbColors(tile.style.backgroundColor);

    if(arrayColorsInt === undefined || (rgbToHex(arrayColorsInt) === "#ffffff")) {
        arrayColorsInt = hexToRgb(currentColor.hex)
        arrayColorsInt.push(0.1);
        return `rgba(${arrayColorsInt.join(',')})`;
    }

    if(arrayColorsInt[3] === undefined) { //Dont paint solid tiles 
        return tile.style.backgroundColor;
    }

    if (currentColor.hex === rgbToHex(arrayColorsInt)) {
            arrayColorsInt[3] = (arrayColorsInt[3] * 10 + 1) / 10;
    } else {
        arrayColorsInt = hexToRgb(currentColor.hex)
        arrayColorsInt.push(0.1);
    }
    return `rgba(${arrayColorsInt.join(',')})`;
}
function getRgbColors(string) {
    if (string == '') return undefined;
    let colors = [];
    if(string.includes('rgba')) {
        colors = string.substring(5, string.length - 1).split(',');
    } else {
        colors = string.substring(4, string.length - 1).split(',');
    }
    const colorsInt = colors.map(color => {
        color = color.trim();
        color = +color;
        return color;
    });
    console.log(colorsInt);
    return colorsInt;
}

function getRandomHex() {
    return "#000000".replace(/0/g, ()=> (~~(Math.random()*16)).toString(16));
}
// function getRandomRgb() {
//     var red = Math.floor(Math.random() * 256);
//     var green = Math.floor(Math.random() * 256);
//     var blue = Math.floor(Math.random() * 256);
  
//     return "rgb(" + red + ", " + green + ", " + blue + ")";
//   }
function componentToHex(num) {
    return num.toString(16).padStart(2,0);
}
function rgbToHex([r, g, b]) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRgb(hex) {
    hex = hex.replace("#", "");
  
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(function (char) {
          return char + char;
        })
        .join("");
    }

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);
    return [red,green,blue];
}
  

const shaddingBtn = document.getElementById('shaddingBtn');
const shaddingText = document.getElementById('shaddingText');
shaddingBtn.addEventListener('click', (e) => {
    shaddingActive = !shaddingActive;
    shaddingBtn.classList.contains('active') ? shaddingBtn.classList.remove('active') : shaddingBtn.classList.add('active');
    shaddingText.innerText = shaddingText.innerText === "OFF" ? "ON" : "OFF";
})

const rainbowBtn = document.getElementById('rainbowBtn');
const rainbowText = document.getElementById('rainbowText');
rainbowBtn.addEventListener('click', (e) => {
    rainbowActive = !rainbowActive;
    rainbowBtn.classList.contains('active') ? rainbowBtn.classList.remove('active') : rainbowBtn.classList.add('active');
    rainbowText.innerText = rainbowText.innerText === "OFF" ? "ON" : "OFF";
})

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', (e) => {
    createGrid(currentScreenSize.width);
})


createGrid(16);

})()