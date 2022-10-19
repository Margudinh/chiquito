import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header>
        <nav className="bg-black h-16 flex items-center px-4">
          <h2 className="text-white text-2xl">Chiquito</h2>
        </nav>
      </header>

      <main className="bg-neutral-900 py-4">{children}</main>

      <footer className="bg-black h-10 flex items-center justify-center">
        <div className="text-xl text-white">Footer content goes here</div>
      </footer>
    </div>
  );
};

export default Layout;
