import React from "react";
import { parseISO, format } from "date-fns";

interface Props {
  dateString: string;
}

export default function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  return (
    <time dateTime={format(date, "yyyy-MM-dd")}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
