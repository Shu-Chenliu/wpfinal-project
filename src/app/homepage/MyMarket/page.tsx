import AddProductDialog from "./components/AddProductDialog";

function HomePage() {
  return (
    <div className="flex h-[90vh] w-full ">
      {/* <div className="flex flex-col items-center justify-center">
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a document to edit
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-top">
        <p className="text-sm font-semibold text-slate-700">
          Welcome to My Market
        </p>

        <AddProductDialog />
      </div>
    </div>
  );
}
export default HomePage;