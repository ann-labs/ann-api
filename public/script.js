const endpoints = [
  { method: "GET", path: "/api/status", desc: "Get API status" },
  { method: "GET", path: "/api/endpoints", desc: "List endpoints" },
  { method: "GET", path: "/api/hentai", desc: "Fetch hentai list" }
];

const container = document.getElementById("endpoints");
const output = document.getElementById("output");

endpoints.forEach(ep => {
  const div = document.createElement("div");
  div.className = "endpoint";
  div.textContent = `${ep.method} ${ep.path} — ${ep.desc}`;
  div.onclick = async () => {
    output.textContent = "Loading...";
    try {
      const res = await fetch(ep.path);
      const json = await res.json();
      output.textContent = JSON.stringify(json, null, 2);
    } catch(e) {
      output.textContent = "Failed to fetch";
      console.error(e);
    }
  };
  container.appendChild(div);
});