const lousaContainer = document.getElementById("lousa-container");
const pixelContainer = document.querySelector(".pixel");
const colorPalette = document.getElementById("color-palette");

function getPropertiesOfUser() {
  const width = 850;
  const height = 500;
  const pixelEdges = tamanhosDePixelsPossivel(width, height);
  const edge = pixelEdges[0];
  renderizationOfLousa(width, height, edge);
  inicializaPalette();
}
getPropertiesOfUser();

function renderizationOfLousa(lousaWidth, lousaHeight, pixelEdge) {
  lousaContainer.style.width = lousaWidth + "px";
  lousaContainer.style.height = lousaHeight + "px";

  const quantityOfPixels = (lousaWidth * lousaHeight) / pixelEdge ** 2;

  for (let index = 0; index < quantityOfPixels; index += 1) {
    const pixel = document.createElement("div");
    pixel.style.width = pixelEdge + "px";
    pixel.style.height = pixelEdge + "px";
    pixel.className = "pixel";
    pixel.addEventListener("click", pinta);
    lousaContainer.appendChild(pixel);
  }
}

function pinta(event) {
  const mouseColor = document.getElementById("colorRGB").value;
  event.target.style.backgroundColor = mouseColor;
}

function selecionaCor (event){
  let selectedColor = event.target.innerText;
  document.getElementById("colorRGB").value = selectedColor;
}

function inicializaPalette() {
  const colors = [
    "#000000",
    "#666666",
    "#3E00D1",
    "#FFFFFF",
    "#AAAAAA",
    "#00C4FF",
    "#008018",
    "#A20000",
    "#9C3A00",
    "#00C232",
    "#FF0000",
    "#FF6D00",
    "#B37200",
    "#A4004D",
    "#D54853",
    "#FFCA00",
    "#FF008E",
    "#FFA8A6",
  ];
  for (let index = 0; index < 18; index += 1) {
    const color = document.createElement("div");
    color.className = "color";
    color.style.backgroundColor = colors[index];
    color.style.color = colors[index];
    color.innerText = colors[index];
    color.addEventListener("click", selecionaCor);
    colorPalette.appendChild(color);
  }
  const colorRGB = document.createElement("input");
  colorRGB.id = "colorRGB";
  colorRGB.type = "color";
  colorPalette.appendChild(colorRGB);
}

function tamanhosDePixelsPossivel(width, height) {
  const mmc = calculaMMC(width, height);
  const tableOfPixels = [];
  for (let index = 1; index <= mmc; index += 1) {
    if (mmc % index === 0) {
      tableOfPixels.push(index);
    }
  }
  tableOfPixels.reverse();
  return tableOfPixels;
}

function calculaMMC(number1, number2) {
  const maiorNumber = number1 > number2 ? number1 : number2;
  for (let index = maiorNumber; index > 0; index -= 1) {
    if (number1 % index === 0 && number2 % index === 0) {
      return index;
    }
  }
}
