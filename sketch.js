const gridContainer = document.querySelector("#grid");
const newGridBtn = document.querySelector("#newGrid");
let numSquares = 16;

const createGrid = (sideLength) => {
    for (let i = 0; i < sideLength; i++) {
        const gridRow = document.createElement("div");
        gridRow.style.height = `${100 / sideLength}vh`;
        gridRow.classList.add("row");

        for (let j = 0; j < sideLength; j++) {
            const gridCell = document.createElement("div");
            gridCell.style.width = `${100 / sideLength}vw`;
            gridCell.classList.add("cell");
            gridCell.style.backgroundColor = `rgba(${randRGB()}, 0)`;
            gridCell.addEventListener("mouseenter", () => {
                if (+gridCell.style.opacity < 1) {
                    const oldOpacity = +gridCell.style.backgroundColor.split(",").at(-1).trim().split(")")[0];
                    gridCell.style.backgroundColor = gridCell.style.backgroundColor.replace(
                        /[^,]+(?=\))/,
                        oldOpacity + 0.1
                    );
                }
            });
            gridRow.appendChild(gridCell);
        }

        gridContainer.appendChild(gridRow);
    }
};

const randRGB = () => {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    return `${r}, ${g}, ${b}`;
};

newGridBtn.addEventListener("click", () => {
    do {
        numSquares = prompt("How many squares per side of the grid (max of 100)");
        if (!numSquares) break;
    } while (numSquares === "" || +numSquares <= 0 || +numSquares > 100);

    // recreate the grid with the new dimensions
    if (numSquares) {
        while (gridContainer.firstChild) {
            gridContainer.removeChild(gridContainer.lastChild);
        }
        createGrid(numSquares);
    }
});

createGrid(numSquares);
