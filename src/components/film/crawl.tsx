import { FragmentType, graphql, useFragment } from "@/gql";
import classNames from "classnames";
import { useState } from "react";

const filmCrawlFragment = graphql(/* GraphQl */ `
  fragment filmCrawl on Film {
    openingCrawl
  }
`);

interface FilmCrawlProps {
  film: FragmentType<typeof filmCrawlFragment>;
}

const FilmCrawl = ({ film }: FilmCrawlProps) => {
  const { openingCrawl } = useFragment(filmCrawlFragment, film);

  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className={classNames(
          "text-center transition-all duration-500 overflow-hidden",
          {
            "max-h-screen ": expanded,
            "max-h-28": !expanded,
          }
        )}
      >
        <p
          className={classNames(
            "whitespace-pre mb-2 tracking-wider font-semibold",
            {
              "line-clamp-3": !expanded,
              "line-clamp-none": expanded,
            }
          )}
        >
          {openingCrawl}
        </p>
        <button
          className="text-blue-900 bold hover:underline"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded && "Read less"}
          {!expanded && "Read more..."}
        </button>
      </div>
    </div>
  );
};

export default FilmCrawl;
