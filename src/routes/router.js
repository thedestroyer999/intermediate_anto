import LoginView from "../scripts/views/login-view.js";
import RegisterView from "../scripts/views/register-view.js";
import StoryView from "../scripts/views/story-view.js";
import AddView from "../scripts/views/add-view.js";
import DetailView from "../scripts/views/detail-view.js";
import FooterView from "../scripts/views/footer-view.js";
import NavbarView from "../scripts/views/navbar-view.js";

import LoginPresenter from "../scripts/presenters/login-presenter.js";
import RegisterPresenter from "../scripts/presenters/register-presenter.js";
import StoryPresenter from "../scripts/presenters/story-presenter.js";
import AddPresenter from "../scripts/presenters/add-presenter.js";
import DetailPresenter from "../scripts/presenters/detail-presenter.js";

// Rute utama
const routes = {
  "/login": {
    view: LoginView,
    presenter: LoginPresenter,
    title: "Login",
  },
  "/register": {
    view: RegisterView,
    presenter: RegisterPresenter,
    title: "Register",
  },
  "/stories": {
    view: StoryView,
    presenter: StoryPresenter,
    title: "Stories",
  },
  "/add": {
    view: AddView,
    presenter: AddPresenter,
    title: "Add Story",
  },
};

const renderPage = async () => {
  const app = document.getElementById("app");
  const hash = window.location.hash.slice(1) || "/login";
  const isAuthPage = hash === "/login" || hash === "/register";
  const storyDetailRegex = /^\/stories\/(.+)/;
  const matchDetail = hash.match(storyDetailRegex);

  app.innerHTML = "";

  // Jika halaman detail story
  if (matchDetail) {
    const id = matchDetail[1];
    document.title = `Story Detail - ${id}`;

    const navbar = new NavbarView();
    app.appendChild(navbar.render());

    const container = document.createElement("div");
    container.id = "main-content";
    container.tabIndex = -1;
    container.innerHTML = DetailView.render();
    app.appendChild(container);

    new DetailPresenter({ view: DetailView, id });

    const footer = new FooterView();
    app.appendChild(footer.render());
    return;
  }

  // Cek route biasa
  const route = routes[hash];

  if (!route) {
    document.title = "404 - Page Not Found";
    app.innerHTML = "<h2>404 - Page Not Found</h2>";
    return;
  }

  document.title = route.title;

  // Render bagian navbar jika bukan halaman auth
  if (!isAuthPage) {
    const navbar = new NavbarView();
    app.appendChild(navbar.render());
  }

  // Render konten utama
  const container = document.createElement("div");
  container.id = "main-content";
  container.tabIndex = -1;
  container.innerHTML = route.view.render();
  app.appendChild(container);

  // Inisialisasi presenter
  new route.presenter({ view: route.view });

  // Render footer jika bukan halaman auth
  if (!isAuthPage) {
    const footer = new FooterView();
    app.appendChild(footer.render());
  }
};

// Gunakan View Transition API jika tersedia
const router = () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => renderPage());
  } else {
    renderPage();
  }
};

// Event listener utama
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

// Skip Link aksesibilitas
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("skip-link")) {
    setTimeout(() => {
      const target = document.getElementById("main-content");
      if (target) {
        target.focus();
      }
    }, 0);
  }
});

export default router;
