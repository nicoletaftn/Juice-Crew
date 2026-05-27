const people = [
  {
    id: "elena",
    name: "Dr. Elena Vortex",
    role: "Chief Architect",
    initials: "EV",
    color: "#6c5ce7",
    bio: "Designed the original vulnerable architecture that makes Juice Shop delightfully broken.",
    fullBio: "Elena spent a decade breaking production systems before deciding to build one on purpose. She mapped every OWASP Top 10 category to a specific aisle in the fictional shop — from the fruit section (XSS) to the checkout (injection flaws). Her motto: \"If it compiles and it's insecure, ship it.\"",
    funFact: "Keeps a rubber duck named 'Sanitizer' on her desk. It has never sanitized anything.",
    tags: ["Architecture", "OWASP Top 10", "Threat Modeling"]
  },
  {
    id: "marcus",
    name: "Marcus 'SQL' Chen",
    role: "Backend Engineer",
    initials: "MC",
    color: "#0984e3",
    bio: "Responsible for the API endpoints that definitely validate all user input. Probably.",
    fullBio: "Marcus wrote the REST API layer with a single guiding principle: trust the client. His favorite endpoint returns user data when you guess the right ID — he calls it \"efficient pagination.\" When not coding, he teaches workshops titled 'Why Prepared Statements Are Overrated' (satire, we hope).",
    funFact: "Once deployed to production on a Friday. On purpose.",
    tags: ["Node.js", "REST API", "Database Design"]
  },
  {
    id: "priya",
    name: "Priya Sankaran",
    role: "Security Research Lead",
    initials: "PS",
    color: "#00b894",
    bio: "Ensures every challenge is exploitable, educational, and just a little too realistic.",
    fullBio: "Priya reverse-engineers real-world breach reports and distills them into bite-sized Juice Shop challenges. She maintains a spreadsheet of 'vulnerabilities we haven't shipped yet' with 200+ rows. Colleagues say her code reviews consist mostly of asking 'but can you steal the admin password with this?'",
    funFact: "Has solved every Juice Shop challenge blindfolded. Claims it's 'muscle memory.'",
    tags: ["Pen Testing", "CTF Design", "AppSec"]
  },
  {
    id: "theo",
    name: "Theo Nakamura",
    role: "Frontend Developer",
    initials: "TN",
    color: "#fdcb6e",
    bio: "Built the UI so smooth you'll forget you're being hacked.",
    fullBio: "Theo crafted the Angular frontend with pixel-perfect juice bottles and intentionally leaky client-side logic. He embedded secrets in minified bundles 'for performance reasons' and left helpful comments in the source like `// TODO: remove before prod`. Spoiler: he never did.",
    funFact: "Color-coded the XSS payloads to match the site's orange theme.",
    tags: ["Angular", "UI/UX", "Client-Side Security"]
  },
  {
    id: "zara",
    name: "Zara Okonkwo",
    role: "DevOps & Infrastructure",
    initials: "ZO",
    color: "#e17055",
    bio: "Keeps the servers running and the secrets conveniently in environment variables.",
    fullBio: "Zara manages deployment pipelines, Docker containers, and the legendary `.env` file that somehow ended up in the repo. She believes in infrastructure as code — specifically, code that exposes too much in error messages. Her monitoring dashboard shows uptime and 'number of successful SQL injections today.'",
    funFact: "Named every server after a different fruit. The mango server is the most exploited.",
    tags: ["Docker", "CI/CD", "Cloud"]
  },
  {
    id: "finn",
    name: "Finn O'Brien",
    role: "Community & Documentation",
    initials: "FO",
    color: "#a29bfe",
    bio: "Writes the docs nobody reads and the hints everyone desperately needs.",
    fullBio: "Finn bridges the gap between hackers and learners. He wrote the official walkthrough, the unofficial walkthrough, and a haiku version of the solution guide. He runs the community Discord where beginners ask 'is this a bug or a feature?' — the answer is always yes.",
    funFact: "Autocorrect changed 'vulnerability' to 'voluntarily' in a release note once. Left it in.",
    tags: ["Docs", "Community", "Education"]
  }
];

function renderCards() {
  const grid = document.getElementById("team-grid");
  grid.innerHTML = people.map((p) => `
    <article class="person-card" data-id="${p.id}">
      <div class="person-header">
        <div class="avatar" style="background: ${p.color}">${p.initials}</div>
        <div class="person-info">
          <h3>${p.name}</h3>
          <span class="role">${p.role}</span>
        </div>
      </div>
      <p class="bio">${p.bio}</p>
      <div class="tags">
        ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
      <a href="#" class="learn-more" data-id="${p.id}">Learn more →</a>
    </article>
  `).join("");
}

function openModal(id) {
  const person = people.find((p) => p.id === id);
  if (!person) return;

  const overlay = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <div class="avatar" style="background: ${person.color}">${person.initials}</div>
    <h3>${person.name}</h3>
    <span class="role">${person.role}</span>
    <p class="full-bio">${person.fullBio}</p>
    <div class="fun-fact">
      <strong>Fun fact</strong>
      ${person.funFact}
    </div>
  `;

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();

  document.getElementById("team-grid").addEventListener("click", (e) => {
    const link = e.target.closest(".learn-more");
    if (link) {
      e.preventDefault();
      openModal(link.dataset.id);
    }
  });

  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
