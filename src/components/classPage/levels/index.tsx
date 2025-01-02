import { Class } from "../../../ldo/dnd5e.typings";

interface Props {
  classInfo: Class;
}

export default function ClassPageLevels({ classInfo }: Props) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Level</th>
            <th scope="col">Proficiency Bonus</th>
            <th scope="col">Features</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
