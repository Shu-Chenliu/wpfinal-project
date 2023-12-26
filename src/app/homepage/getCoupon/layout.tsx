
type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    <main className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      <div className="w-full overflow-y-scroll">{children}</div>
    </main>
  );
}

export default DocsLayout;