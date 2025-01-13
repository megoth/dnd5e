import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { BrowserSolidLdoProvider } from "@ldo/solid-react";
import HomePage from "./components/homePage";
import AppProvider from "./hooks/useApp/provider";
import "./styles/globals.css";
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
import ClassPage from "./components/classPage";
import SpellPage from "./components/spellPage";
import SearchPage from "./components/searchPage";
import RacePage from "./components/racePage";
import WeaponsPage from "./components/weaponsPage";
import ArmorPage from "./components/armorPage";
import MonsterPage from "./components/monsterPage";
import WeaponPage from "./components/weaponPage";

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
        path: "/armor",
        element: <ArmorPage />,
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
        path: "/classes",
        element: <ClassesPage />,
      },
      {
        path: "/classes/:url",
        element: <ClassPage />,
      },
      {
        path: "/equipment",
        element: <EquipmentPage />,
      },
      {
        path: "/monsters",
        element: <MonstersPage />,
      },
      {
        path: "/monsters/:url",
        element: <MonsterPage />,
      },
      {
        path: "/races",
        element: <RacesPage />,
      },
      {
        path: "/races/:url",
        element: <RacePage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/spells",
        element: <SpellsPage />,
      },
      {
        path: "/spells/:url",
        element: <SpellPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/weapons",
        element: <WeaponsPage />,
      },
      {
        path: "/weapons/:url",
        element: <WeaponPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
