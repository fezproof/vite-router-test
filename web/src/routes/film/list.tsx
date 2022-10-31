import { client } from "@/clients/apollo";
import FilmHeading from "@/components/film/heading";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { generatePath, Link, LoaderFunction } from "react-router-dom";

const allFilmsQueryDocument = graphql(/* GraphQL */ `
  query allFilmsQuery {
    allFilms {
      films {
        id
        ...filmHeading
        ...filmCrawl
      }
    }
  }
`);

export const loader: LoaderFunction = async () => {
  client.query({
    query: allFilmsQueryDocument,
    fetchPolicy: "network-only",
  });
};

const Root = () => {
  const { data, loading } = useQuery(allFilmsQueryDocument);

  return (
    <div className="p-8">
      <main className="max-w-prose mx-auto w-full">
        <ul className="flex flex-col flex-nowrap gap-8">
          {loading && (
            <>
              <li>
                <span className="bg-gray-300 h-7 w-48 block m-0.5"></span>
                <span className="bg-gray-300 h-5 w-32 block m-0.5"></span>
              </li>
              <li>
                <span className="bg-gray-300 h-7 w-48 block m-0.5"></span>
                <span className="bg-gray-300 h-5 w-32 block m-0.5"></span>
              </li>
            </>
          )}
          {data?.allFilms?.films?.map((film, index) => {
            if (!film) {
              return (
                <li key={index}>
                  <h2 className="text-lg">Failed to load film</h2>
                </li>
              );
            }

            return (
              <li key={film.id} className="hover:underline">
                <Link to={generatePath("../:id", { id: film.id })}>
                  <FilmHeading film={film} headingRank="h2" />
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Root;
