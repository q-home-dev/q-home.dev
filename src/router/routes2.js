import MainLayout from "layouts/MainLayout";
import IndexPage from "pages/IndexPage";
import AboutPage from "pages/AboutPage";
import ContactPage from "pages/ContactPage";
import LoginPage from "pages/LoginPage";
import MapsPage from "pages/MapsPage";
import PhotosPage from "pages/PhotosPage";
import SettingsPage from "pages/SettingsPage";
import VideosPage from "pages/VideosPage";
import Error404 from "pages/Error404";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: IndexPage },
      { path: "about", component: AboutPage },
      { path: "contact", component: ContactPage },
      { path: "login", component: LoginPage },
      { path: "map", component: MapsPage },
      { path: "photos", component: PhotosPage },
      { path: "settings", component: SettingsPage },
      { path: "videos", component: VideosPage }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: Error404
  });
}

export default routes;
