var s = Snap("#visual");
var dripPath = s.select("#drip-path");

// Convert the path to cubic commands to access each point
var segments = Snap.path.toCubic(dripPath.attr("d"));
console.log(segments);

// Define indices for "bump" segments we want to animate down
const bumpSegments = [2, 4, 8, 12, 16, 20, 24, 32]; // Adjust these based on where your bumps are

// Convert segments array back to path string
function segmentsToPathString(segments) {
  return segments.map(segment => segment.join(" ")).join(" ");
}

// Function to animate a single bump drip effect
function animateBumpDrip(segmentIndex) {
  const segment = segments[segmentIndex];
  if (segment && segment[0] === "C") { // Only animate cubic bezier segments
    const originalY = segment[5]; // Y coordinate of the last control point in the segment
    const originalControlY1 = segment[3]; // Y coordinate of the first control point
    const originalControlY2 = segment[1]; // Y coordinate of the second control point
    const offsetY = Math.random() * 15 + 8; // Smaller downward offset for very gentle drip

    // Animate downward with a slight bounce effect
    Snap.animate(
      0,
      offsetY,
      function (val) {
        if (!isNaN(val)) {
          // Move the endpoint slightly more than the control points for a rounder effect
          segment[5] = originalY + val; 
          segment[3] = originalControlY1 + val * 0.6; // Adjust first control point for roundness
          segment[1] = originalControlY2 + val * 0.4; // Adjust second control point for even gentler rounding
          dripPath.attr({ d: segmentsToPathString(segments) });
        }
      },
      1500, // Longer duration for smoother animation
      mina.easeinout, // Smooth easing for a natural drip
      function () {
        // Add a "bounce" effect to the drip
        Snap.animate(
          offsetY,
          offsetY * 0.2, // Smaller bounce effect for gentler return
          function (val) {
            if (!isNaN(val)) {
              segment[5] = originalY + val;
              segment[3] = originalControlY1 + val * 0.6;
              segment[1] = originalControlY2 + val * 0.4;
              dripPath.attr({ d: segmentsToPathString(segments) });
            }
          },
          500, // Shorter duration for bounce, making it look smoother
          mina.easeout,
          function () {
            // Final return to the original position
            Snap.animate(
              offsetY * 0.2,
              0,
              function (val) {
                if (!isNaN(val)) {
                  segment[5] = originalY + val;
                  segment[3] = originalControlY1 + val * 0.6;
                  segment[1] = originalControlY2 + val * 0.4;
                  dripPath.attr({ d: segmentsToPathString(segments) });
                }
              },
              700,
              mina.easeinout
            );
          }
        );
      }
    );
  }
}

// Function to trigger random dripping of each bump
function randomBumpDrips() {
  bumpSegments.forEach((segmentIndex) => {
    setTimeout(() => animateBumpDrip(segmentIndex), Math.random() * 1000);
  });
}

// Call the randomBumpDrips function every few seconds for continuous dripping
setInterval(randomBumpDrips, 5000);

