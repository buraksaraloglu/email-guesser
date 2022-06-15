const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 mx-auto max-w-xl transition-all duration-200 md:mt-8 lg:mt-16">{children}</div>;
};

export default Layout;
