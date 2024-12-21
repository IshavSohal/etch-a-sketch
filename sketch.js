const gridContainer = document.querySelector("#grid");
const clearGridBtn = document.querySelector("#clearGrid");
const newGridInput = document.querySelector("#newGrid");
const penTypeInput = document.querySelector("#penType");
const rainbowButton = document.querySelector("#rainbowMode");

let numSquares = 16;
let isMouseDown = false;
let rainbowMode = false;
let penType = "Pen";

const createGrid = (sideLength) => {
    for (let i = 0; i < sideLength; i++) {
        const gridRow = document.createElement("div");
        gridRow.style.height = `${100 / sideLength}%`;
        gridRow.classList.add("row");
        for (let j = 0; j < sideLength; j++) {
            const gridCell = document.createElement("div");
            gridCell.style.width = `${100 / sideLength}%`;
            gridCell.classList.add("cell");
            gridCell.style.backgroundColor = `rgba(${cellBackgroundRGB()}, 0)`;
            gridCell.addEventListener("mouseenter", () => {
                if (isMouseDown) {
                    const oldOpacity = +gridCell.style.backgroundColor.split(",").at(3)?.trim().split(")")[0];
                    const newOpacity = penType === "Pen" || oldOpacity === undefined ? 1 : oldOpacity + 0.1;
                    gridCell.style.backgroundColor = `rgba(${cellBackgroundRGB()}, ${newOpacity})`;
                }
            });
            gridRow.appendChild(gridCell);
        }
        gridContainer.appendChild(gridRow);
    }
};

const clearGrid = () => {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.lastChild);
    }
    createGrid(numSquares);
};

const cellBackgroundRGB = () => {
    return `${rainbowMode ? randRGB() : "0, 0, 0"}`;
};

const randRGB = () => {
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    return `${r}, ${g}, ${b}`;
};

gridContainer.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isMouseDown = true;
});

document.addEventListener("mouseup", () => {
    isMouseDown = false;
});

clearGridBtn.addEventListener("click", clearGrid);

newGridInput.addEventListener("change", (e) => {
    numSquares = newGridInput.value;
    clearGrid();
});

penTypeInput.addEventListener("change", (e) => {
    penType = penTypeInput.value;
});

rainbowButton.addEventListener("click", () => {
    rainbowMode = !rainbowMode;
    rainbowButton.style.background = rainbowMode ? "rgb(101, 133, 220)" : "";
});

createGrid(numSquares);
