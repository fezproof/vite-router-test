import { client } from "@/clients/apollo";
import FilmCrawl from "@/components/film/crawl";
import FilmHeading from "@/components/film/heading";
import { graphql } from "@/gql";
import { useQuery } from "@apollo/client";
import { LoaderFunction, redirect, useParams } from "react-router-dom";

const filmDetailsQueryDocument = graphql(/* GraphQL */ `
  query filmDetailsQuery($id: ID!) {
    film(id: $id) {
      id
      ...filmHeading
      ...filmCrawl
    }
  }
`);

export const loader: LoaderFunction = async ({ params: { id } }) => {
  if (typeof id !== "string") {
    return redirect("../list");
  }
  try {
    await client.query({
      query: filmDetailsQueryDocument,
      variables: { id },
      fetchPolicy: "cache-first",
    });
  } catch (error) {
    return redirect("/film/list");
  }
};

const Root = () => {
  const { id } = useParams();

  const { data } = useQuery(filmDetailsQueryDocument, {
    variables: { id: id as string },
    fetchPolicy: "cache-first",
  });

  return (
    <div className="p-8">
      <header className="mx-auto max-w-prose w-full mb-8">
        {data?.film && <FilmHeading film={data.film} />}
      </header>
      <main className="max-w-prose mx-auto w-full">
        {data?.film && <FilmCrawl film={data.film} />}
      </main>
    </div>
  );
};

export default Root;
