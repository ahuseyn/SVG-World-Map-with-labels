const labels = document.querySelectorAll("text");

labels.forEach((label) => {
  label.addEventListener("mouseover", () => {
    const code = label.getAttribute("class");
    const elements = document.querySelectorAll(`.${code}`);

    for (const element of elements) {
      if (element.tagName !== "text") element.classList.add("hover");
    }
  });

  label.addEventListener("mouseleave", () => {
    const elements = document.querySelectorAll(`.hover`);

    for (const element of elements) {
      element.classList.remove("hover");
    }
  });
});

let selectedPalette = "normal";

const palettes = {
  signature: {
    background: "#87CEEB",
    land: "#FFF8DC",
    secondary: "#FFDEAD",
    text: "#800000",
  },
  grey: {
    background: "#fafafa",
    land: "#d3d3d3",
    secondary: "#939393",
    text: "#191919",
  },
  green: {
    background: "#dda15e",
    land: "#606c38",
    secondary: "#394021",
    text: "#fefae0",
  },
  calm: {
    background: "#9dc7e2",
    land: "#e1e0d0",
    secondary: "#c3c1a1",
    text: "#191919",
  },
  purple: {
    background: "#ffcdb2",
    land: "#b5838d",
    secondary: "#6d6875",
    text: "#023047",
  },
  dark: {
    background: "#2c3e50",
    land: "#f4a261",
    secondary: "#92613a",
    text: "#ffffff",
  },
};

const palettesDiv = document.getElementById("palettes");

for (const palette of Object.keys(palettes)) {
  const colors = Object.values(palettes[palette]);

  const group = document.createElement("div");
  group.setAttribute("class", "palette-colors");
  group.setAttribute("id", palette);
  palettesDiv.appendChild(group);

  colors.forEach((color) => {
    const cube = document.createElement("div");
    cube.style.backgroundColor = color;
    cube.style.height = "30px";

    group.appendChild(cube);
  });
}

const paletteColors = document.querySelectorAll(".palette-colors");

paletteColors.forEach((palette) => {
  palette.addEventListener("click", (e) => setColorPalette(e.target.id));
});

function setColorPalette(selectedPalette) {
  paletteColors.forEach((palette) => {
    palette.classList.remove("selected");
  });

  const paletteButton = document.getElementById(selectedPalette);
  paletteButton.classList.add("selected");

  const styles = `
    text {
      fill: ${palettes[selectedPalette].text};
    }

    #background {
      fill: ${palettes[selectedPalette].background};
    }

    .landxx {
      fill: ${palettes[selectedPalette].land};
      stroke: ${palettes[selectedPalette].secondary};
    }

    g:hover path,
    path:hover,
    path.hover,
    g.hover path {
      fill: ${palettes[selectedPalette].secondary};
    }
  `;

  const paletteStyle = document.getElementById("palette");
  paletteStyle?.remove();

  document.body.style.backgroundColor = palettes[selectedPalette].background;

  const svg = document.querySelector("#svg-map");
  const style = document.createElement("style");

  svg.prepend(style);
  style.setAttribute("id", "palette");

  style.appendChild(document.createTextNode(styles));
}

const labelsSwitch = document.getElementById("show-labels");

labelsSwitch.addEventListener("change", (e) => {
  const labels = document.getElementById("labels");
  labels.style.display = e.target.checked ? "block" : "none";
});

window.onload = function () {
  setColorPalette("signature");
};

document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    const svgContent = new XMLSerializer().serializeToString(
      document.querySelector("#svg-map")
    );

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "SVG World Map with labels.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
