import { FragmentType, graphql, useFragment } from "@/gql";
import { intToRoman } from "@/utils/intToRoman";

export const filmHeadingFragment = graphql(/* GraphQL */ `
  fragment filmHeading on Film {
    title
    director
    episodeID
  }
`);

interface FilmHeadingProps {
  film: FragmentType<typeof filmHeadingFragment>;
  headingRank?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const FilmHeading = ({
  film,
  headingRank: Heading = "h1",
}: FilmHeadingProps) => {
  const data = useFragment(filmHeadingFragment, film);

  return (
    <div>
      <Heading className="text-xl font-semibold">
        Episode {intToRoman(data.episodeID ?? 0)}:{" "}
        <span className="font-bold">{data.title}</span>
      </Heading>
      <p className="text-gray-600">Directed by {data.director}</p>
    </div>
  );
};

export default FilmHeading;
