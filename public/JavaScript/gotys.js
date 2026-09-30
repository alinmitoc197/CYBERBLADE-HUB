function loadXMLDoc() {
  fetch("gotys.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "text/xml");

      const juegos = xml.getElementsByTagName("GOTYS");
      const container = document.getElementById("gotys");

      container.innerHTML = "";

      for (let i = 0; i < juegos.length; i++) {
        const nombre = juegos[i].getElementsByTagName("NOMBRE")[0].textContent;
        const year = juegos[i].getElementsByTagName("YEAR")[0].textContent;

        const card = document.createElement("div");
        card.classList.add("goty-card");

        card.innerHTML = `
          <div class="rank">${(i + 1).toString().padStart(2, '0')}</div>
          <div class="goty-info">
            <div class="goty-year">${year}</div>
            <div class="goty-title">${nombre}</div>
          </div>
        `;

        container.appendChild(card);
      }
    });
}
