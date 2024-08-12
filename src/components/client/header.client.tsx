"use client";

import { useState, useEffect } from "react";
import { Avatar, Drawer, Dropdown, Menu, Space, message } from "antd";
import styles from "@/styles/client.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { callLogout } from "@/config/api";
import { setLogoutAction } from "@/redux/slice/accountSlide";
import ManageAccount from "./modal/manage.account";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
interface NavLinkType {
  title: string;
  path: string;
}

interface HeroSectionProps {
  logo: string;
  nav: NavLinkType[];
}

const Header: React.FC<HeroSectionProps> = ({ logo, nav }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [current, setCurrent] = useState<string>("home");
  const location = useLocation();
  const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false);
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const onClick = (e: { key: string }) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: <NavLink href="/admin" title="Trang Quản Trị" />,
      key: "admin",
    },
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => setOpenManageAccount(true)}
        >
          Quản lý tài khoản
        </label>
      ),
      key: "manage-account",
    },

    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={handleLogout}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];

  const itemsMobiles = [...itemsDropdown];

  return (
    <>
      <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
          <NavLink href="/" title={logo} />
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="menu hidden md:block md:w-auto" id="navbar">
            <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
              {nav.map((link, index) => (
                <li key={index} className="bg-[#121212] bg-opacity-100">
                  <NavLink href={link.path} title={link.title} />
                </li>
              ))}
              <div className={styles["extra"]}>
                {isAuthenticated === false ? (
                  <NavLink href="/login" title="Login" />
                ) : (
                  <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                    <Space style={{ cursor: "pointer" }}>
                      <Avatar className="bg-white text-black">
                        {user?.name?.substring(0, 2)?.toUpperCase()}
                      </Avatar>
                    </Space>
                  </Dropdown>
                )}
              </div>
            </ul>
          </div>
        </div>
        {navbarOpen && <MenuOverlay links={nav} />}
      </nav>

      <Drawer
        title="Chức năng"
        placement="right"
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={itemsMobiles}
        />
      </Drawer>
      <ManageAccount
        open={openMangeAccount}
        onClose={() => setOpenManageAccount(false)}
      />
    </>
  );
};

export default Header;
