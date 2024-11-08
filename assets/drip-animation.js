document.addEventListener("DOMContentLoaded", function () {
  // Initialize Snap with the SVG element
  var s = Snap("#visual");
  if (!s) {
    console.error("SVG with ID 'visual' not found.");
    return;
  }
  
  var dripPath = s.select("#drip-path");
  if (!dripPath) {
    console.error("Path with ID 'drip-path' not found.");
    return;
  }

  // Define the cubic segments for animation
  var segments = Snap.path.toCubic(dripPath.attr("d"));

  // Select segments to animate
  const bumpSegments = [2, 4, 8, 12, 16]; // Example of potential bump points

  function segmentsToPathString(segments) {
    return segments.map(segment => segment.join(" ")).join(" ");
  }

  function animateBumpDrip(segmentIndex) {
    const segment = segments[segmentIndex];
    if (segment && segment[0] === "C") {
      const originalY = segment[5];
      const offsetY = Math.random() * 20 + 10;

      Snap.animate(
        originalY,
        originalY + offsetY,
        function (val) {
          if (!isNaN(val)) {
            segment[5] = val;
            dripPath.attr({ d: segmentsToPathString(segments) });
          }
        },
        800,
        mina.easeinout,
        function () {
          Snap.animate(
            originalY + offsetY,
            originalY,
            function (val) {
              if (!isNaN(val)) {
                segment[5] = val;
                dripPath.attr({ d: segmentsToPathString(segments) });
              }
            },
            800,
            mina.easeinout
          );
        }
      );
    }
  }

  function randomBumpDrips() {
    bumpSegments.forEach((index) => {
      setTimeout(() => animateBumpDrip(index), Math.random() * 500);
    });
  }

  // Call animation every few seconds
  setInterval(randomBumpDrips, 2000);
});
