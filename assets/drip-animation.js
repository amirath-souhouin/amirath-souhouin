document.addEventListener("DOMContentLoaded", function() {
  // Get the path element
  const dripPath = document.querySelector("#drip-path");

  // Convert the path to cubic commands to access each point
  let pathData = dripPath.getAttribute("d").split(" ");
  
  // Define indices for bump segments (adjust based on your SVG's bump structure)
  const bumpSegments = [2, 4, 8, 12, 16, 20, 24, 32];

  // Function to convert path data array back to string
  function segmentsToPathString(data) {
    return data.join(" ");
  }

  // Function to animate a single bump drip effect
  function animateBumpDrip(segmentIndex) {
    let originalY = parseFloat(pathData[segmentIndex + 5]);
    const offsetY = Math.random() * 15 + 8;

    // Animate downward with a bounce effect
    let downward = setInterval(() => {
      pathData[segmentIndex + 5] = originalY + offsetY; // Apply downward motion
      dripPath.setAttribute("d", segmentsToPathString(pathData));
    }, 50);

    setTimeout(() => {
      clearInterval(downward);

      let bounceUp = setInterval(() => {
        pathData[segmentIndex + 5] = originalY; // Bring it back up
        dripPath.setAttribute("d", segmentsToPathString(pathData));
      }, 50);

      setTimeout(() => clearInterval(bounceUp), 700); // Adjust bounce duration
    }, 1500); // Adjust total animation duration
  }

  // Function to trigger random dripping of each bump
  function randomBumpDrips() {
    bumpSegments.forEach((segmentIndex) => {
      setTimeout(() => animateBumpDrip(segmentIndex), Math.random() * 1000);
    });
  }

  // Call the randomBumpDrips function every few seconds for continuous dripping
  setInterval(randomBumpDrips, 3000);
});
