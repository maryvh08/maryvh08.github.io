const projects = [
  {
    title: "Workout Tracker",
    description: "App para planificación de entrenamiento",
    tech: "HTML, CSS, JS",
    link: "#"
  }
];

const container = document.querySelector("#projects");

projects.forEach(p => {
  const div = document.createElement("div");
  div.className = "project-card";
  div.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <small>${p.tech}</small>
  `;
  container.appendChild(div);
});
