import { type Illustration } from "../../ldo/dnd5e.typings";
import { useLocalization } from "@fluent/react";
import Markdown from "react-markdown";
import { bem } from "../../utils/bem";
import { HTMLProps } from "react";
import clsx from "clsx";

interface Props extends HTMLProps<HTMLDivElement> {
  subject: Illustration;
  modifier?: "compact";
}

export default function Illustration({ className, subject, modifier }: Props) {
  const { l10n } = useLocalization();
  if (!subject) return null;
  return (
    <div
      className={clsx(bem("illustration", modifier), className)}
      style={{ minHeight: 256 }}
    >
      <img
        src={subject.imageUrl?.["@id"]}
        alt={subject.description.join("\n\n")}
      />
      {subject.creator && (
        <div className={bem("illustration__creator", modifier)}>
          <Markdown>
            {l10n.getString("illustrationBy", {
              creator: subject.creatorUrl
                ? `[${subject.creator}](${subject.creatorUrl})`
                : subject.creator,
            })}
          </Markdown>
        </div>
      )}
    </div>
  );
}
