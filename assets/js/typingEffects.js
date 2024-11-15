document.addEventListener("DOMContentLoaded", function () {
  const nameElement = document.getElementById("name");
  const nameText = "Amirath M.A Souhouin"; // Your full name
  let index = 0;

  function type() {
    if (index < nameText.length) {
      nameElement.textContent += nameText[index];
      index++;
      setTimeout(type, 100); // Adjust typing speed here
    }
  }

  type();
});
