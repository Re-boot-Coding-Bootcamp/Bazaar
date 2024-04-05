"use client";

import { api } from "~/trpc/react";

export default function Home() {
  const { data: categories, isFetching } =
    api.category.getAllCategories.useQuery();

  if (isFetching) {
    return <div>Fetching for categories, hold on...</div>;
  }

  if (!categories) {
    return <div>No categories found.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </main>
  );
}
