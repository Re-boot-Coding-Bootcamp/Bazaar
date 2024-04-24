export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  // API: use the productId to fetch all the details of the product

  return <div>ProductDetailsPage for Product w/ ID: {params.productId}</div>;
}
