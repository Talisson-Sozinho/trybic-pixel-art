/* Salvando referências para alguns elemento Html que será usando no código */
const lousaContainer = document.getElementById("lousa-container");
const colorPalette = document.getElementById("color-palette");
const inputWidth = document.getElementById("input-width");
const inputHeight = document.getElementById("input-height");
const inputPixelEdge = document.getElementById("input-pixel-edge");
const borderOnOff = document.getElementsByClassName("border-option");
const saveChangesButton = document.getElementById("save-changes-button");
const deleteButton = document.getElementById("delete-button");
const deleteLastSaveButton = document.getElementById("delete-last-save-button");
const getLastSaveButton = document.getElementById("get-last-save-button");

/* Constantes de largura e altura maximaria */
const WIDTH_MIN = 100;
const WIDTH_MAX = 900;
const HEIGHT_MIN = 100;
const HEIGHT_MAX = 700;

/* Configuração inicial da lousa que poderá ser alterada pelo usuário */
const objectConfig = {
  width: 600,
  height: 500,
  pixelEdges: 0,
  edge: 0,
};
objectConfig.pixelEdges = tamanhosDePixelsPossivel(
  objectConfig.width,
  objectConfig.height
);
objectConfig.edge = objectConfig.pixelEdges[0];

/* adicionando as configurações iniciais da página */
function getPropertiesOfUser() {
  getLastSave();
  inputWidth.value = objectConfig.width;
  inputHeight.value = objectConfig.height;
  inputPixelEdge.max = objectConfig.pixelEdges.length - 2;
  inputPixelEdge.min = 0;
  inputPixelEdge.value = objectConfig.pixelEdges.indexOf(objectConfig.edge);
  renderizationOfLousa();
  inicializaPalette();
  userProperties();
  setTickmarks();
  toggleLousa(true);
}
getPropertiesOfUser();

/* Liga e desliga a possibilidade de desenhar */
function toggleLousa(bloolean) {
  if (bloolean) {
    lousaContainer.addEventListener("click", pinta);
  }
}

/* Função para adicionar interatividade nas configurações do quadro */
function userProperties() {
  inputWidth.addEventListener("input", modifyWidthOfLousa);
  inputHeight.addEventListener("input", modifyHeightOfLousa);
  inputPixelEdge.addEventListener("change", modifyQuantityOfPixel);
  saveChangesButton.addEventListener("click", saveChanges);
  deleteButton.addEventListener("click", deleteDrawing);
  deleteLastSaveButton.addEventListener("click", deleteLastSave);
  getLastSaveButton.addEventListener("click", () => {
    if (!getLastSave()) {
      alert("Sem pixel art salva");
    }
  });
  borderOnOff[0].addEventListener("input", borderOnOrOff);
  borderOnOff[1].addEventListener("input", borderOnOrOff);
}

/* Função para ativar e desativar as bordas do quadro de desenho */
function borderOnOrOff(event) {
  const pixels = document.getElementsByClassName("pixel");
  if (event.target.value === "on") {
    for (let pixel of pixels) {
      pixel.style.borderBottom = "0.1px solid #252525";
      pixel.style.borderRight = "0.1px solid #252525";
      lousaContainer.style.borderBottom = 0;
      lousaContainer.style.borderRight = 0;
    }
  } else {
    for (let pixel of pixels) {
      pixel.style.borderBottom = 0;
      pixel.style.borderRight = 0;
      lousaContainer.style.borderBottom = "0.1px solid #252525";
      lousaContainer.style.borderRight = "0.1px solid #252525";
    }
  }
}

/* Função para alterar o tamando da largura conforme o novo input do usuário */
function modifyWidthOfLousa(event) {
  deleteDrawing();
  objectConfig.width = event.target.value;
  objectConfig.pixelEdges = tamanhosDePixelsPossivel(
    objectConfig.width,
    objectConfig.height
  );
  objectConfig.edge = objectConfig.pixelEdges[0];
  inputPixelEdge.value = 0;
  inputPixelEdge.max = objectConfig.pixelEdges.length - 2;
  renderizationOfLousa();
}

/* Função para alterar o tamando da altura conforme o novo input do usuário */
function modifyHeightOfLousa(event) {
  deleteDrawing();
  objectConfig.height = event.target.value;
  objectConfig.pixelEdges = tamanhosDePixelsPossivel(
    objectConfig.width,
    objectConfig.height
  );
  objectConfig.edge = objectConfig.pixelEdges[0];
  inputPixelEdge.value = 0;
  inputPixelEdge.max = objectConfig.pixelEdges.length - 2;
  renderizationOfLousa();
}

/* Função para modificar a quantidade de pixel na tele de pintura */
function modifyQuantityOfPixel(event) {
  deleteDrawing();
  let index = event.target.value;
  objectConfig.edge = objectConfig.pixelEdges[index];
  renderizationOfLousa();
}

/* Função para salvar a pixel art no localStorage */
function saveChanges() {
  const objChangesUser = {
    lousa: [],
    width: 0,
    height: 0,
    pixelEdges: 0,
    edge: 0,
  };
  objChangesUser.width = objectConfig.width;
  objChangesUser.height = objectConfig.height;
  objChangesUser.pixelEdges = objectConfig.pixelEdges;
  objChangesUser.edge = objectConfig.edge;
  for (let pixel of lousaContainer.children) {
    objChangesUser.lousa.push(pixel.style.backgroundColor);
  }
  localStorage.setItem("lousaModify", JSON.stringify(objChangesUser));
  alert("Salvo");
}

/* Função para apagar o desenho do quadro */
function deleteDrawing() {
  for (let pixel of lousaContainer.children) {
    pixel.style.backgroundColor = "#FFFFFF";
  }
}

/* Função para deletar o save do localStorage */
function deleteLastSave() {
  localStorage.clear();
}

function getLastSave() {
  const storage = JSON.parse(localStorage.getItem("lousaModify"));
  let hasLastSave = false;
  if (storage !== null) {
    hasLastSave = true;
    objectConfig.width = storage.width;
    objectConfig.height = storage.height;
    objectConfig.pixelEdges = storage.pixelEdges;
    objectConfig.edge = storage.edge;
    inputWidth.value = storage.width;
    inputHeight.value = storage.height;
    inputPixelEdge.value = storage.pixelEdges.indexOf(objectConfig.edge);
    renderizationOfLousa();
    setTickmarks();
  }
  return hasLastSave;
}

/* Função para alterar a marcação da quantidade de pixel */
function modifyTickmarksPixel() {
  const tickmarks = document.getElementById("tickmarks-pixel-edge");
  for (let index = 0; index <= inputPixelEdge.max; index += 1) {
    const mark = document.createElement("option");
    mark.value = index;
    tickmarks.appendChild(mark);
  }
}

/* Função para dicionar Tickmarks no condigurador de width e height */
function setTickmarks() {
  const tickmarksWidth = document.getElementById("tickmarks-width");
  const tickmarksHeight = document.getElementById("tickmarks-height");

  for (index = WIDTH_MIN; index <= WIDTH_MAX; index += 50) {
    const tickmark = document.createElement("option");
    tickmark.value = index;
    tickmarksWidth.appendChild(tickmark);
    if (index <= HEIGHT_MAX) {
      const tickmark = document.createElement("option");
      tickmark.value = index;
      tickmarksHeight.appendChild(tickmark);
    }
  }
}

/* Função para adicionar a renderização, inicial e/ou alterada pelo usuário, do qudro na pagina */
function renderizationOfLousa() {
  const storage = JSON.parse(localStorage.getItem("lousaModify"));
  lousaContainer.style.width = objectConfig.width + "px";
  lousaContainer.style.height = objectConfig.height + "px";

  const quantityOfPixels =
    (objectConfig.width * objectConfig.height) / objectConfig.edge ** 2;

  if (lousaContainer.children.length !== 0) {
    lousaContainer.innerHTML = null;
  }

  for (let index = 0; index < quantityOfPixels; index += 1) {
    const pixel = document.createElement("div");
    if (borderOnOff[0].checked) {
      pixel.style.borderBottom = "0.1px solid #000000";
      pixel.style.borderRight = "0.1px solid #000000";
    }
    storage === null
      ? (pixel.style.backgroundColor = "#FFFFFF")
      : (pixel.style.backgroundColor = storage.lousa[index]);
    pixel.style.width = objectConfig.edge + "px";
    pixel.style.height = objectConfig.edge + "px";
    pixel.className = "pixel";
    lousaContainer.appendChild(pixel);
  }
  if (borderOnOff[1].checked) {
    lousaContainer.style.borderBottom = "0.1px solid #000000";
    lousaContainer.style.borderRight = "0.1px solid #000000";
  } else {
    lousaContainer.style.borderBottom = 0;
    lousaContainer.style.borderRight = 0;
  }
  modifyTickmarksPixel();
}

/* Função para pintar o pixel clicado com a cor selecionada */
function pinta(event) {
  if (event.target.className === "pixel") {
    const mouseColor = document.getElementById("colorRGB").value;
    event.target.style.backgroundColor = mouseColor;
  }
}

/* Função para adicionar cores padrões na paleta e adicionar a possibilidade de selecionar um deles */
function inicializaPalette() {
  colorPalette.addEventListener("click", selecionaCor);
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
    colorPalette.appendChild(color);
  }
  const colorRGB = document.createElement("input");
  colorRGB.id = "colorRGB";
  colorRGB.type = "color";
  colorPalette.appendChild(colorRGB);
}

/* Função para retornar um array todos os tamanho, inteiro, de pixel dado um tamando de tela */
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

/* Função para selecionar a cor padrão clicada como a cor que será tiginda cor padrão */
function selecionaCor(event) {
  if (event.target.className === "color") {
    document.getElementById("colorRGB").value = event.target.innerText;
  }
}

/* Função auxiliar para usar no calculo do tamando do lado do 'pixel' */
function calculaMMC(number1, number2) {
  const maiorNumber = number1 > number2 ? number1 : number2;
  for (let index = maiorNumber; index > 0; index -= 1) {
    if (number1 % index === 0 && number2 % index === 0) {
      return index;
    }
  }
}
