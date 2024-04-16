export default function ProductDetailsPage({
  params,
}: {
  params: { categoryId: string };
}) {
  // API: use the categoryId to fetch the products for that category
  // get all the products, and filter by the categoryId

  return <div>Product list page for categoryId w/ ID: {params.categoryId}</div>;
}
