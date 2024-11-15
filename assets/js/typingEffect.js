document.addEventListener("DOMContentLoaded", function () {
  const nameElement = document.getElementById("name");
  const nameText = "Amirath M.A Souhouin"; // Your full name
  let index = 0;

  if (!nameElement) {
    console.error("Element with ID 'name' not found.");
    return;
  }

  function type() {
    if (index < nameText.length) {
      nameElement.textContent += nameText[index]; // Append one character at a time
      index++;
      setTimeout(type, 100); // Adjust typing speed here
    }
  }

  type();
});
