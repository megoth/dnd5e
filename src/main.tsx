import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BrowserSolidLdoProvider } from "@ldo/solid-react";
import AppProvider from "./hooks/useApp/provider";
import "./styles/globals.css";
import LayoutProvider from "./hooks/useLayout/provider";
import Loading from "./components/loading";
import Layout from "./components/layout";
import BackgroundPage from "./components/backgroundPage";

function lazyLoadPage(Component, full: boolean = false) {
  return (
    <Suspense
      fallback={
        <Layout full={full}>
          <div className="px-4 md:text-center">
            <Loading />
          </div>
        </Layout>
      }
    >
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <BrowserSolidLdoProvider>
        <AppProvider>
          <LayoutProvider>
            <Outlet />
          </LayoutProvider>
        </AppProvider>
      </BrowserSolidLdoProvider>
    ),
    children: [
      {
        index: true,
        element: lazyLoadPage(
          lazy(() => import("./components/homePage")),
          true,
        ),
      },
      {
        path: "/about",
        element: lazyLoadPage(lazy(() => import("./components/aboutPage"))),
      },
      {
        path: "/armor",
        element: lazyLoadPage(
          lazy(() => import("./components/armorIndexPage")),
        ),
      },
      {
        path: "/armor/:url",
        element: lazyLoadPage(
          lazy(() => import("./components/armorSinglePage")),
        ),
      },
      {
        path: "/backgrounds",
        element: lazyLoadPage(
          lazy(() => import("./components/backgroundsPage")),
        ),
      },
      {
        path: "/backgrounds/:url",
        element: lazyLoadPage(
          lazy(() => import("./components/backgroundPage")),
        ),
      },
      {
        path: "/characters",
        element: lazyLoadPage(
          lazy(() => import("./components/charactersPage")),
        ),
      },
      {
        path: "/characters/create",
        element: lazyLoadPage(
          lazy(() => import("./components/characterCreatePage")),
        ),
      },
      {
        path: "/faq",
        element: lazyLoadPage(lazy(() => import("./components/faqPage"))),
      },
      {
        path: "/login",
        element: lazyLoadPage(
          lazy(() => import("./components/loginPage")),
          true,
        ),
      },
      {
        path: "/rules",
        element: lazyLoadPage(lazy(() => import("./components/rulesPage"))),
      },
      {
        path: "/classes",
        element: lazyLoadPage(lazy(() => import("./components/classesPage"))),
      },
      {
        path: "/classes/:url",
        element: lazyLoadPage(lazy(() => import("./components/classPage"))),
      },
      {
        path: "/equipment",
        element: lazyLoadPage(
          lazy(() => import("./components/equipmentIndexPage")),
        ),
      },
      {
        path: "/equipment/:url",
        element: lazyLoadPage(
          lazy(() => import("./components/equipmentSinglePage")),
        ),
      },
      {
        path: "/magic-items",
        element: lazyLoadPage(
          lazy(() => import("./components/magicItemsPage")),
        ),
      },
      {
        path: "/magic-items/:url",
        element: lazyLoadPage(lazy(() => import("./components/magicItemPage"))),
      },
      {
        path: "/monsters",
        element: lazyLoadPage(lazy(() => import("./components/monstersPage"))),
      },
      {
        path: "/monsters/:url",
        element: lazyLoadPage(lazy(() => import("./components/monsterPage"))),
      },
      {
        path: "/races",
        element: lazyLoadPage(lazy(() => import("./components/racesPage"))),
      },
      {
        path: "/races/:url",
        element: lazyLoadPage(lazy(() => import("./components/racePage"))),
      },
      {
        path: "/search",
        element: lazyLoadPage(lazy(() => import("./components/searchPage"))),
      },
      {
        path: "/settings",
        element: lazyLoadPage(lazy(() => import("./components/settingsPage"))),
      },
      {
        path: "/signup",
        element: lazyLoadPage(
          lazy(() => import("./components/signupPage")),
          true,
        ),
      },
      {
        path: "/skills",
        element: lazyLoadPage(lazy(() => import("./components/skillsPage"))),
      },
      {
        path: "/skills/:url",
        element: lazyLoadPage(lazy(() => import("./components/skillPage"))),
      },
      {
        path: "/spells",
        element: lazyLoadPage(lazy(() => import("./components/spellsPage"))),
      },
      {
        path: "/spells/:url",
        element: lazyLoadPage(lazy(() => import("./components/spellPage"))),
      },
      {
        path: "/storages",
        element: lazyLoadPage(lazy(() => import("./components/storagesPage"))),
      },
      {
        path: "/storages/create",
        element: lazyLoadPage(
          lazy(() => import("./components/storageCreatePage")),
        ),
      },
      {
        path: "/storages/:url",
        element: lazyLoadPage(lazy(() => import("./components/storagePage"))),
      },
      {
        path: "/subclasses",
        element: lazyLoadPage(
          lazy(() => import("./components/subclassesPage")),
        ),
      },
      {
        path: "/subraces",
        element: lazyLoadPage(lazy(() => import("./components/subracesPage"))),
      },
      {
        path: "/weapons",
        element: lazyLoadPage(lazy(() => import("./components/weaponsPage"))),
      },
      {
        path: "/weapons/:url",
        element: lazyLoadPage(lazy(() => import("./components/weaponPage"))),
      },
      {
        path: "/you",
        element: lazyLoadPage(lazy(() => import("./components/youPage"))),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
