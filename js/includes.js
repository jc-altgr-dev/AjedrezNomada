// Script para cargar modularmente el header y footer
function loadInclude(id, file) {
  fetch(file)
    .then(res => res.text())
    .then(data => document.getElementById(id).innerHTML = data);
}
loadInclude("header", "../AjedrezNomada/includes/header.html");
loadInclude("footer", "../AjedrezNomada/includes/footer.html");

