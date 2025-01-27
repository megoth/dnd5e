import React from "react";
import Layout from "../layout";
import Translation from "../translation";
import WarningMessage from "../warningMessage";
import Loading from "../loading";
import { BackgroundShapeType } from "../../ldo/dnd5e.shapeTypes";
import useListOfType from "../../hooks/useListOfType";
import Content from "../content";
import { NavLink } from "react-router-dom";
import { bem } from "../../utils/bem";
import { useNavigate } from "react-router";
import Logo from "../logo";
import Illustration from "../illustration";
import Markdown from "react-markdown";

export default function BackgroundsPage() {
  const navigate = useNavigate();
  const { items: backgrounds, isLoading } = useListOfType(
    BackgroundShapeType,
    "backgrounds",
    "Background",
  );

  return (
    <Layout>
      <WarningMessage id="workInProgress" />
      <Content>
        <h1>
          <Translation id="backgrounds" /> ({backgrounds.length})
        </h1>
        {isLoading && <Loading />}
      </Content>
      {!isLoading && (
        <ul className="cards">
          {backgrounds
            .sort((a, b) => (a.label > b.label ? 1 : -1))
            .map((background) => (
              <li
                key={background["@id"]}
                className={bem("card", "clickable")}
                onClick={(event) => {
                  if ((event.target as HTMLElement).nodeName === "A") return;
                  return navigate(`/backgrounds/${btoa(background["@id"])}`);
                }}
              >
                {background.illustration ? (
                  <Illustration
                    className="card__media"
                    subject={background.illustration}
                    modifier="compact"
                  />
                ) : (
                  <Logo className="card__media hidden md:block" />
                )}
                <div className="card__content">
                  <h2 className="card__title">
                    <NavLink to={`/backgrounds/${btoa(background["@id"])}`}>
                      {background.label}
                    </NavLink>
                  </h2>
                  {background.backgroundFeature && (
                    <Content>
                      <p className="notification">
                        {background.backgroundFeature.label}
                      </p>
                      <Markdown>
                        {background.backgroundFeature.description}
                      </Markdown>
                    </Content>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </Layout>
  );
}
