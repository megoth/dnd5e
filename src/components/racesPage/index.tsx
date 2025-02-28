import React from "react";
import Layout from "../layout";
import Content from "../content";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import useListOfType from "../../hooks/useListOfType";
import { RaceShapeType } from "../../ldo/dnd5e.shapeTypes";
import Loading from "../loading";
import { NavLink } from "react-router-dom";
import Logo from "../logo";
import Markdown from "react-markdown";
import { useNavigate } from "react-router";
import Illustration from "../illustration";
import { bem } from "../../utils/bem";

export default function RacesPage() {
  const navigate = useNavigate();
  const { isLoading, items: races } = useListOfType(
    RaceShapeType,
    "races",
    "Race",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="racesPageTitle" /> ({races.length})
        </h1>
        {isLoading && <Loading />}
      </Content>
      {!isLoading && (
        <ul className="cards">
          {races
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((race) => (
              <li
                key={race["@id"]}
                className={bem("card", "clickable")}
                onClick={(event) => {
                  if ((event.target as HTMLElement).nodeName === "A") return;
                  return navigate(`/races/${btoa(race["@id"])}`);
                }}
              >
                {race.illustration ? (
                  <Illustration
                    className="card__media"
                    subject={race.illustration}
                    modifier="compact"
                  />
                ) : (
                  <Logo className="card__media hidden md:block" />
                )}
                <div className="card__content">
                  <h2 className="card__title">
                    <NavLink to={`/classes/${btoa(race["@id"])}`}>
                      {race.label}
                    </NavLink>
                  </h2>
                  {race.description && (
                    <Markdown className="content">{race.description}</Markdown>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </Layout>
  );
}
