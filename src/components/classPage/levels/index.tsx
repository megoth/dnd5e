import { Class } from "../../../ldo/dnd5e.typings";
import {
  classHasRage,
  classHasHigherSpellcasting,
  rageCount,
  classHasLowerSpellcasting,
  classHasSpellsKnown,
  classHasCantripsKnown,
  classHasMartialArts,
  classHasSneakAttack,
  classHasSorceryPoints,
  parseNumber,
  classHasInvocations,
  sumSpellSlots,
  highestSpellLevel,
} from "../../../utils/dnd5e";
import Translation from "../../translation";

interface Props {
  classInfo: Class;
}

export default function ClassPageLevels({ classInfo }: Props) {
  const hasRage = classHasRage(classInfo);
  const hasLowerSpellcasting = classHasLowerSpellcasting(classInfo);
  const hasHigherSpellcasting = classHasHigherSpellcasting(classInfo);
  const hasSpellsKnown = classHasSpellsKnown(classInfo);
  const hasCantripsKnown = classHasCantripsKnown(classInfo);
  const hasMartialArts = classHasMartialArts(classInfo);
  const hasSneakAttack = classHasSneakAttack(classInfo);
  const hasSorceryPoints = classHasSorceryPoints(classInfo);
  const hasInvocations = classHasInvocations(classInfo);
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          {hasLowerSpellcasting && !hasInvocations && (
            <tr>
              <th colSpan={2} />
              {hasMartialArts && <th colSpan={3} />}
              {hasSneakAttack && <th colSpan={1} />}
              {hasSorceryPoints && <th colSpan={1} />}
              <th colSpan={1} />
              {hasRage && <th colSpan={2} />}
              {hasCantripsKnown && <th colSpan={1} />}
              {hasSpellsKnown && <th colSpan={1} />}
              <th
                colSpan={hasHigherSpellcasting ? 9 : 5}
                className="text-center"
              >
                <Translation id="spellSlotsPerSpellLevel" />
              </th>
            </tr>
          )}
          <tr>
            <th scope="col">
              <Translation id="level" />
            </th>
            <th scope="col">
              <Translation id="proficiencyBonus" />
            </th>
            {hasMartialArts && (
              <>
                <th scope="col">
                  <Translation id="martialArts" />
                </th>
                <th scope="col">
                  <Translation id="kiPoints" />
                </th>
                <th scope="col">
                  <Translation id="unarmoredMovement" />
                </th>
              </>
            )}
            {hasSneakAttack && (
              <th scope="col">
                <Translation id="sneakAttack" />
              </th>
            )}
            {hasSorceryPoints && (
              <th scope="col">
                <Translation id="sorceryPoints" />
              </th>
            )}
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
            {hasCantripsKnown && (
              <th scope="col">
                <Translation id="cantripsKnown" />
              </th>
            )}
            {hasSpellsKnown && (
              <th scope="col">
                <Translation id="spellsKnown" />
              </th>
            )}
            {hasLowerSpellcasting && !hasInvocations && (
              <>
                <th scope="col">
                  <Translation id="order1" />
                </th>
                <th scope="col">
                  <Translation id="order2" />
                </th>
                <th scope="col">
                  <Translation id="order3" />
                </th>
                <th scope="col">
                  <Translation id="order4" />
                </th>
                <th scope="col">
                  <Translation id="order5" />
                </th>
              </>
            )}
            {hasHigherSpellcasting && !hasInvocations && (
              <>
                <th scope="col">
                  <Translation id="order6" />
                </th>
                <th scope="col">
                  <Translation id="order7" />
                </th>
                <th scope="col">
                  <Translation id="order8" />
                </th>
                <th scope="col">
                  <Translation id="order9" />
                </th>
              </>
            )}
            {hasInvocations && (
              <>
                <th scope="col">
                  <Translation id="spellSlots" />
                </th>
                <th scope="col">
                  <Translation id="slotLevel" />
                </th>
                <th scope="col">
                  <Translation id="invocationsKnown" />
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {classInfo.levels.map((level) => (
            <tr key={level["@id"]}>
              <td>{level.level}</td>
              <td>+{level.proficiencyBonus}</td>
              {hasMartialArts && (
                <>
                  <td>
                    <Translation
                      id={"dice"}
                      vars={{
                        count: level.classSpecific.martialArts.diceCount,
                        value: level.classSpecific.martialArts.diceValue,
                      }}
                    />
                  </td>
                  <td>{parseNumber(level.classSpecific.kiPoints)}</td>
                  <td>
                    {((bonus) =>
                      bonus ? (
                        <Translation id="movementBonus" vars={{ bonus }} />
                      ) : (
                        "-"
                      ))(parseInt(level.classSpecific.unarmoredMovement, 10))}
                  </td>
                </>
              )}
              {hasSneakAttack && (
                <td>
                  <Translation
                    id={"dice"}
                    vars={{
                      count: level.classSpecific.sneakAttack.diceCount,
                      value: level.classSpecific.sneakAttack.diceValue,
                    }}
                  />
                </td>
              )}
              {hasSorceryPoints && (
                <td>{parseNumber(level.classSpecific.sorceryPoints)}</td>
              )}
              <td>
                {level.features.map((feature) => feature.label).join(", ")}
              </td>
              {hasRage && <td>{rageCount(level.classSpecific.rageCount)}</td>}
              {hasRage && <td>{level.classSpecific.rageDamageBonus}</td>}
              {hasCantripsKnown && <td>{level.spellcasting.cantripsKnown}</td>}
              {hasSpellsKnown && <td>{level.spellcasting.spellsKnown}</td>}
              {hasLowerSpellcasting && !hasInvocations && (
                <>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel1)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel2)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel3)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel4)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel5)}</td>
                </>
              )}
              {hasHigherSpellcasting && !hasInvocations && (
                <>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel6)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel7)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel8)}</td>
                  <td>{parseNumber(level.spellcasting.spellSlotsLevel9)}</td>
                </>
              )}
              {hasInvocations && (
                <>
                  <td>{sumSpellSlots(level)}</td>
                  <td>
                    <Translation id={`order${highestSpellLevel(level)}`} />
                  </td>
                  <td>{parseNumber(level.classSpecific.invocationsKnown)}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
