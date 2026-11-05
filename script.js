const photo = document.getElementById("profilePhoto");
const fallback = document.getElementById("photoFallback");
photo.addEventListener("load", () => { photo.style.display = "block"; fallback.style.display = "none"; });
photo.addEventListener("error", () => { photo.style.display = "none"; fallback.style.display = "flex"; });

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => { if (window.scrollY >= section.offsetTop - 150) current = section.id; });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("educationHint").addEventListener("click", () => {
  const toast = document.getElementById("toast");
  toast.textContent = "Edit the Education paragraph in index.html with your degree and institution.";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
});
