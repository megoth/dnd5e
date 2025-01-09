import { type Illustration } from "../../ldo/dnd5e.typings";
import { useLocalization } from "@fluent/react";
import Markdown from "react-markdown";

interface Props {
  src: Illustration;
}

export default function Illustration({ src }: Props) {
  const { l10n } = useLocalization();
  return (
    <div className="illustration">
      <img src={src.imageUrl["@id"]} alt={src.description} />
      {src.creator && (
        <div className="illustration__creator">
          <Markdown>
            {l10n.getString("illustrationCreatedBy", {
              creator: src.creatorUrl
                ? `[${src.creator}](${src.creatorUrl})`
                : src.creator,
            })}
          </Markdown>
        </div>
      )}
    </div>
  );
}
