import { useQuery } from "@tanstack/react-query";
import { getAPI } from "@/repositories/api";
import ProductList from "./ProductList";

const ProductListCategory = ({ category, role }) => {
  const { data, isFetched } = useQuery([`products/${category.category}`], async () => {
    const res = await getAPI(`product/category/${category.id}`);
    return res.data;
  });
  return <ProductList value={category.category} role={role} data={isFetched && data} />;
};

export default ProductListCategory;
