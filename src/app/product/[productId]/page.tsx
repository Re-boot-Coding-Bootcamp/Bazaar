"use client";

export default function ProductDetailsPage({
  params,
}: {
  params: { productId: string };
}) {
  return <div>ProductDetailsPage for Product w/ ID: {params.productId}</div>;
}
