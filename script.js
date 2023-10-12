const gridContainer = document.querySelector('#grid-container');
const body = document.querySelector('body');

// add a reset button

const resetButton = document.querySelector('#reset-btn');
resetButton.addEventListener('click', () => {
    createGrid(newGridSize);
});

// change grid size when user changes the range slider

const sizePicker = document.querySelector('#size-picker');
sizePicker.addEventListener('change', () => {
    newGridSize = sizePicker.value;
    createGrid(newGridSize);
});

// change the grid size label when slider moves

const sizePickerContainer = document.querySelector('#size-picker-container');
const sizePickerLabel = document.querySelector('#size-picker-label');
sizePicker.addEventListener('input', () => {
    sizePickerLabel.textContent = sizePicker.value + ' x ' + sizePicker.value;
});


createGrid(16);

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
    color = document.getElementById('color-picker').value;
    e.target.style.backgroundColor = color;
}

