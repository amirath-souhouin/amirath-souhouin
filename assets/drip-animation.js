document.addEventListener("DOMContentLoaded", () => {
  const svgContainer = document.querySelector(".header");
  
  // Load SVG from external file
  fetch("assets/drip-banner.svg")
    .then(response => response.text())
    .then(svgData => {
      svgContainer.innerHTML = svgData; // Insert SVG into the header container

      // After SVG is loaded, load and apply the path animations
      loadPathVariations();
    })
    .catch(error => console.error("Error loading SVG:", error));

  function loadPathVariations() {
    fetch("assets/path-variations.json")
      .then(response => response.json())
      .then(data => {
        const paths = data.paths;
        animateDrip(paths);
      })
      .catch(error => console.error("Error loading path variations:", error));
  }

  function animateDrip(paths) {
    const pathElement = document.getElementById("drip-path");
    let currentPathIndex = 0;

    // Animate by cycling through paths every second
    setInterval(() => {
      pathElement.setAttribute("d", paths[currentPathIndex]);
      currentPathIndex = (currentPathIndex + 1) % paths.length; // Loop back to the start
    }, 1000); // Adjust timing as needed
  }
});
