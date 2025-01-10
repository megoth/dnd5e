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
import { description } from "../../utils/dnd5e";

export default function RacesPage() {
  const navigate = useNavigate();
  const { isLoading, items: races } = useListOfType(
    RaceShapeType,
    "races",
    "Race",
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="racesPageTitle" />
        </h1>
      </Content>
      <ul className="cards">
        {races.map((race) => (
          <li
            key={race["@id"]}
            className="card"
            onClick={(event) => {
              if ((event.target as HTMLElement).nodeName === "A") return;
              return navigate(`/races/${btoa(race["@id"])}`);
            }}
          >
            <Content>
              {race.illustration ? (
                <Illustration
                  className="card__media"
                  subject={race.illustration}
                  modifier="compact"
                />
              ) : (
                <Logo className="card__media" />
              )}
            </Content>
            <div className="card__content">
              <h2 className="card__title">
                <NavLink to={`/classes/${btoa(race["@id"])}`}>
                  {race.label}
                </NavLink>
              </h2>
              {race.description && (
                <Content>
                  <Markdown>{description(race.description)}</Markdown>
                </Content>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
