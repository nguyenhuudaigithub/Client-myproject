import React, { useEffect, useRef, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import NotFound from "components/share/not.found";
import LoginPage from "pages/auth/login";
import RegisterPage from "pages/auth/register";
import LayoutAdmin from "components/admin/layout.admin";

import Header from "components/client/header.client";
import Footer from "components/client/footer.client";
import HomePage from "pages/home";
import styles from "styles/app.module.scss";
import DashboardPage from "pages/admin/dashboard";
import PermissionPage from "pages/admin/permission";
import RolePage from "pages/admin/role";
import UserPage from "pages/admin/user";

import LayoutApp from "components/share/layout.app";

import { callFetchFontEnd } from "config/api";
import Loading from "components/share/loading";
import ProtectedRoute from "./components/share/protected-route.ts";
import { IProfile } from "./types/backend.js";
import { fetchAccount } from "./redux/slice/accountSlide.js";

const LayoutClient: React.FC<{ profileData: IProfile }> = ({ profileData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="layout-app" ref={rootRef}>
      <Header logo={profileData.logo} nav={profileData.navLink} />
      <div className={styles["content-app"]}>
        <Outlet context={[searchTerm, setSearchTerm]} />
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.account.isLoading);

  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    dispatch(fetchAccount());

    const fetchProfile = async () => {
      try {
        const response = await callFetchFontEnd();
        if (response && response.data) {
          setProfileData(response.data);
        } else {
          console.error("Profile data not found");
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!profileData) {
    return <div>Profile data not found</div>;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LayoutApp>
          <LayoutClient profileData={profileData} />
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [{ index: true, element: <HomePage data={profileData} /> }],
    },
    {
      path: "/admin",
      element: (
        <LayoutApp>
          <LayoutAdmin />
        </LayoutApp>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: (
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "permission",
          element: (
            <ProtectedRoute>
              <PermissionPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "role",
          element: (
            <ProtectedRoute>
              <RolePage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
