import React from "react";
import LoadingSpinner from "../CustomComponents/LoadingSpinner";
import UseAllCategories from "../CustomComponents/UseAllCategories";
import UnifiedCard from "../CustomComponents/UnifiedCard";
import { Helmet } from "react-helmet";

export default function Categories() {
  // Use react-query to fetch, cache, and manage the state of the categories data.
  const { data, isError, isLoading } = UseAllCategories();

  // Display a loading spinner while the data is being fetched.
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Display an error message if the API call fails.
  if (isError) {
    return (
      <div className="text-center p-5">
        <h3 className="text-muted">No Categories found.</h3>
      </div>
    );
  }

  // Render the list of categories once the data is available.
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="View and manage your personalized profile. Explore account settings and preferences."
        />
        <title>Categories</title>
      </Helmet>

      <div className="container mx-auto py-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {data?.data?.data.map((category) => (
            <UnifiedCard
              key={category._id}
              image={category.image}
              title={category.name}
              className="mx-auto"
            />
          ))}
        </div>
      </div>
    </>
  );
}
