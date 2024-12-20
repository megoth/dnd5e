import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BrowserSolidLdoProvider } from "@ldo/solid-react";
import HomePage from "./components/homePage";
import AppProvider from "./hooks/useApp/provider";
import "../styles/globals.css";
import AboutPage from "./components/aboutPage";
import FAQPage from "./components/faqPage";
import AdminPage from "./components/adminPage";
import ErrorsPage from "./components/errorsPage";
import AdminFAQPAge from "./components/adminFAQPage";
import LanguagesPage from "./components/languagesPage";
import TranslationsPage from "./components/translationsPage";
import CharactersPage from "./components/charactersPage";
import EncountersPage from "./components/encountersPage";
import NotesPage from "./components/notesPage";
import ClassesPage from "./components/classesPage";
import EquipmentPage from "./components/equipmentPage";
import MonstersPage from "./components/monstersPage";
import RacesPage from "./components/racesPage";
import SpellsPage from "./components/spellsPage";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";
import RulesPage from "./components/rulesPage";
import LayoutProvider from "./hooks/useLayout/provider";

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
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/errors",
        element: <ErrorsPage />,
      },
      {
        path: "/admin/faq",
        element: <AdminFAQPAge />,
      },
      {
        path: "/admin/languages",
        element: <LanguagesPage />,
      },
      {
        path: "/admin/translations",
        element: <TranslationsPage />,
      },
      {
        path: "/characters",
        element: <CharactersPage />,
      },
      {
        path: "/characters/encounters",
        element: <EncountersPage />,
      },
      {
        path: "/characters/notes",
        element: <NotesPage />,
      },
      {
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/rules",
        element: <RulesPage />,
      },
      {
        path: "/rules/classes",
        element: <ClassesPage />,
      },
      {
        path: "/rules/equipment",
        element: <EquipmentPage />,
      },
      {
        path: "/rules/monsters",
        element: <MonstersPage />,
      },
      {
        path: "/rules/races",
        element: <RacesPage />,
      },
      {
        path: "/rules/spells",
        element: <SpellsPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
