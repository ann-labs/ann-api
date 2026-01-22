const container = document.getElementById("endpoint-list");

fetch("/api/endpoints")
  .then(res => res.json())
  .then(data => {
    container.innerHTML = "";

    data.endpoints.forEach(ep => {
      const div = document.createElement("div");
      div.className = "endpoint-card";

      div.innerHTML = `
        <span class="method ${ep.method}">${ep.method}</span>
        <span class="path">${ep.path}</span>
        <p>${ep.description}</p>
        <a href="${ep.path}" target="_blank">Try it</a>
      `;

      container.appendChild(div);
    });
  })
  .catch(() => {
    container.innerHTML = "Failed to load endpoints ❌";
  });