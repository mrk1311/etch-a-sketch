const gridContainer = document.querySelector('#grid-container');
const body = document.querySelector('body');
let gridSize = 16;
let gridVisible = true;

// TODO add a hide/show grid button
const gridButton = document.querySelector('#grid-btn');
gridButton.addEventListener('click', () => {
    if (gridVisible === true) {
        hideGrid();
        gridButton.textContent = 'Show Grid';
    } else {
        showGrid();
        gridButton.textContent = 'Hide Grid';
    }
});

// add a eraser button
const eraserButton = document.querySelector('#eraser-btn');
let eraser = false;
eraserButton.addEventListener('click', () => {
    if (eraser === true) {
        return;
    } else {
        eraser = true;
        rainbowMode = false;
    }
});

// color mode
const colorButton = document.querySelector('#color-btn');
colorButton.addEventListener('click', () => {
    eraser = false;
    rainbowMode = false;
});

// rainbow mode
const rainbowButton = document.querySelector('#rainbow-btn');
let rainbowMode = false;
rainbowButton.addEventListener('click', () => {
    if (rainbowMode === true) {
        return;
    } else {
        rainbowMode = true;
        eraser = false;
    }

});

const modeButtons = document.querySelectorAll('.mode');
modeButtons.forEach((modeButton) => {
    modeButton.addEventListener('click', () => {
        modeButtons.forEach((modeButton) => {
            modeButton.classList.remove('selected');
        });
        modeButton.classList.add('selected');
    });
});


// add a reset button

const resetButton = document.querySelector('#reset-btn');
resetButton.addEventListener('click', () => {
    createGrid(gridSize);
});

// change grid size when user changes the range slider
// change the grid size label when slider moves

const sizePicker = document.querySelector('#size-picker');
const sizePickerContainer = document.querySelector('#size-picker-container');
const sizePickerLabel = document.querySelector('#size-picker-label');
sizePicker.addEventListener('input', () => {
    gridSize = sizePicker.value;
    createGrid(gridSize);
    sizePickerLabel.textContent = sizePicker.value + ' x ' + sizePicker.value;
});


createGrid(gridSize);

function createGrid(size) {

    // delete previous grid
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    
    // create rows
    for (let i=0; i < size; i++) {
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        gridContainer.appendChild(gridRow);

        // create cells
        for (let j=0; j < size; j++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell');
            gridRow.appendChild(gridCell);
        }
    }

    // add event listeners for painting cells

    const gridCells = document.querySelectorAll('.grid-cell');

    // paint cell when mouse is pressed down

    gridCells.forEach((gridCell) => {
        gridCell.addEventListener('mousedown', paint);
    });

    // paint cell when mouse is dragged

    gridContainer.addEventListener('mousedown', (e) => {
        gridCells.forEach((gridCell) => {
            gridCell.addEventListener('mouseover', paint);
        });
    });

    // disable painting when mouse is released

    body.addEventListener('mouseup', (e) => {
        gridCells.forEach((gridCell) => {
            gridCell.removeEventListener('mouseover', paint);
        });
    });

}

// paint a cell

function paint(e) {

    if (rainbowMode === false && eraser === false) {
        color = document.getElementById('color-picker').value;
    } else if (eraser === true){
        color = '#BFC0C0';
    } else if (rainbowMode === true) { 
        color = getRandomColor();
    }

    e.target.style.backgroundColor = color;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function hideGrid() {
    gridVisible = false;
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((gridCell) => {
        gridCell.classList.add('borderless');
    });
}

function showGrid() {
    gridVisible = true;
    const gridCells = document.querySelectorAll('.grid-cell');
    gridCells.forEach((gridCell) => {
        gridCell.classList.remove('borderless');
    });
}
