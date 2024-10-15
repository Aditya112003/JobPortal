import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <footer className="p-10 text-center bg-gray-900 mt-10">
        © 2024 SimplyHire. All Rights Reserved. Empowering Your Career.
      </footer>
    </div>
  );
};

export default AppLayout;
