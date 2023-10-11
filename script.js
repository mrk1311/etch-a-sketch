const gridContainer = document.querySelector('#container');


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

    // paint cell when clicked

    gridCells.forEach((gridCell) => {
        gridCell.addEventListener('click', paint);
    });

    // paint cell when mouse is held down

    gridContainer.addEventListener('mousedown', (e) => {
        gridCells.forEach((gridCell) => {
            gridCell.addEventListener('mouseover', paint);
        });
    });

    // disable painting when mouse is released

    gridContainer.addEventListener('mouseup', (e) => {
        gridCells.forEach((gridCell) => {
            gridCell.removeEventListener('mouseover', paint);
        });
    });

}

// paint cell (add a class to the cell)

function paint(e) {
    e.target.classList.add('grid-cell-painted');
}

createGrid(32);

const resetButton = document.querySelector('#reset-btn');
resetButton.addEventListener('click', () => {
    newGridSize = prompt('Enter a new grid size (1-100):');
    if (newGridSize < 1 || newGridSize > 100) {
        alert('Invalid grid size. Please enter a number between 1 and 100.');
        return;
    }
    createGrid(newGridSize);
});