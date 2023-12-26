import SpinningWheel from "./components/SpinningWheel";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SpinningWheel/>
    </main>
  );
}
