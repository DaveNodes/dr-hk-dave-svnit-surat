import { Outlet, useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";
import Footer from "./Footer";
import Navbar from "./Navbar";

function MaintenancePage() {
  return (
    <div className="min-h-screen hero-gradient flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md">
        <div className="w-20 h-20 rounded-full bg-amber-400/20 border-2 border-amber-400/40 flex items-center justify-center mx-auto mb-6">
          <Wrench className="w-10 h-10 text-amber-400" />
        </div>
        <h1 className="text-4xl font-bold text-white font-display mb-3">
          Under Maintenance
        </h1>
        <p className="text-2xl text-gold mb-2">We'll be back soon</p>
        <p className="text-white/60 text-sm mb-8">
          Dr. HK Dave's academic portfolio at{" "}
          <span className="text-white/80 font-medium">SVNIT Surat</span> is
          currently undergoing scheduled maintenance. Please check back shortly.
        </p>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white/40 text-xs">
          We apologize for any inconvenience. Updates and improvements are in
          progress.
        </div>
      </div>
      <div className="absolute bottom-6">
        <Link
          to="/login"
          className="text-white/30 text-xs hover:text-white/50 underline transition-colors"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}

export default function Layout() {
  const { actor, isFetching } = useActor();
  const location = useLocation();
  const [isMaintenance, setIsMaintenance] = useState(false);

  const isAdminRoute =
    location.pathname === "/admin" || location.pathname === "/login";

  useEffect(() => {
    if (!actor || isFetching || isAdminRoute) return;
    actor
      .isMaintenanceMode()
      .then(setIsMaintenance)
      .catch(() => {});
  }, [actor, isFetching, isAdminRoute]);

  if (isMaintenance && !isAdminRoute) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
