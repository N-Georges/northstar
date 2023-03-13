import Header from "../common/navigation/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="max-w-screen-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
