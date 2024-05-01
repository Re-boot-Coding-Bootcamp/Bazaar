import { NotFoundPage, ProductDetailsPageView } from "~/app/_pageView";
import { api } from "~/trpc/server";

export default async function ProductDetailsPage({
  params,
}: {
  params: { productVariantId: string };
}) {
  const data = await api.product.getProductDetails({
    productVariantId: params.productVariantId,
  });

  if (!data) {
    return <NotFoundPage />;
  }

  return <ProductDetailsPageView data={data} />;
}
