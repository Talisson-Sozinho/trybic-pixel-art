const lousaContainer = document.getElementById("lousa-container");
const pixelContainer = document.querySelector(".pixel");

function getPropertiesOfUser() {
  const width = 800;
  const height = 600;
  const pixelEdges = tamanhosDePixelsPossivel (width, height); 
  const edge = pixelEdges[0];
  console.log(pixelEdges.length);
  renderizationOfLousa(width, height, edge);
}
getPropertiesOfUser();

function renderizationOfLousa(lousaWidth, lousaHeight, pixelEdge) {
  lousaContainer.style.width = lousaWidth + "px";
  lousaContainer.style.height = lousaHeight + "px";

  const quantityOfPixels = (lousaWidth * lousaHeight)/(pixelEdge**2);

  for (let index = 0; index < quantityOfPixels; index += 1) {
    const pixel = document.createElement("div");
    pixel.style.width = pixelEdge + "px";
    pixel.style.height = pixelEdge + "px";
    pixel.className = "pixel";
    lousaContainer.appendChild(pixel);
  }
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
    if (number1 % index  === 0 && number2 % index === 0) {
      return index;
    }
  }
}
