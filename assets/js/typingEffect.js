document.addEventListener("DOMContentLoaded", function () {
  var nameElement = document.getElementById("name");
	var leftBraceElement = document.querySelector(".flicker-brace.left");
  var rightBraceElement = document.querySelector(".flicker-brace.right");
  var nameText = " Hey! I am Amirath M.A Souhouin "; // Your full name
  var index = 0;

  function type() {
    if (index < nameText.length) {
      nameElement.innerText = nameText.slice(0, index + 1); // Update the text content
      index++;
      setTimeout(type, 100); // Adjust typing speed
    } else {
      setTimeout(erase, 1000); // Wait before erasing
    }
  }

  function erase() {
    if (index > 0) {
      nameElement.innerText = nameText.slice(0, index - 1); // Remove one character
      index--;
      setTimeout(erase, 100); // Adjust erasing speed
    } else {
      setTimeout(type, 500); // Wait before typing again
    }
  }
	function flickerBraces() {
    setInterval(function () {
      leftBraceElement.style.opacity = Math.random() > 0.5 ? "1" : "0.3";
      rightBraceElement.style.opacity = Math.random() > 0.5 ? "1" : "0.3";
    }, 200); // Flicker every 200ms
  }

  flickerBraces(); // Start flickering animation for braces
  type(); // Start the animation
});
