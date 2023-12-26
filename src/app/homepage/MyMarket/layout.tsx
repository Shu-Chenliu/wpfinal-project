type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <div className="w-full">
      {children}
    </div>
  );
}

export default DocsLayout;