import { getProduct } from "./components/actions";
import {db}from "@/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
type ProductPageProps = {
  params: {
    postId: string;
  };
};
async function ProductPage({params:{postId}}: ProductPageProps) {
  const session = await auth();
  const username = session?.user?.username;
  const Product= await getProduct(postId);
  return (
    <div className="w-full">
      <p>{Product?.title}</p>
      <p>{Product?.author.username}</p>
      <p>{Product?.price}</p>
    </div>
  );
}

export default ProductPage;
