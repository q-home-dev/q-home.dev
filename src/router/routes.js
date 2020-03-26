const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "about", component: () => import("pages/AboutPage.vue") },
      { path: "contact", component: () => import("pages/ContactPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "photos", component: () => import("pages/PhotosPage.vue") },
      { path: "settings", component: () => import("pages/SettingsPage.vue") },
      { path: "map", component: () => import("pages/MapsPage.vue") },
      { path: "videos", component: () => import("pages/VideosPage.vue") }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
