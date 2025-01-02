import { Class } from "../../../ldo/dnd5e.typings";
import { classHasRage, rageCount } from "../../../utils/dnd5e";
import Translation from "../../translation";

interface Props {
  classInfo: Class;
}

export default function ClassPageLevels({ classInfo }: Props) {
  const hasRage = classHasRage(classInfo);
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">
              <Translation id="level" />
            </th>
            <th scope="col">
              <Translation id="proficiencyBonus" />
            </th>
            <th scope="col">
              <Translation id="features" />
            </th>
            {hasRage && (
              <th scope="col">
                <Translation id="rages" />
              </th>
            )}
            {hasRage && (
              <th scope="col">
                <Translation id="rageDamage" />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {classInfo.levels.map((level) => (
            <tr key={level["@id"]}>
              <td>{level.level}</td>
              <td>+{level.proficiencyBonus}</td>
              <td>
                {level.features.map((feature) => feature.label).join(", ")}
              </td>
              {hasRage && <td>{rageCount(level.classSpecific.rageCount)}</td>}
              {hasRage && <td>{level.classSpecific.rageDamageBonus}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
