
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
}














createGrid(16);

})()