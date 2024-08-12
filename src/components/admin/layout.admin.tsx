import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  ExceptionOutlined,
  ApiOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BugOutlined,
  ProfileOutlined,
  FileWordOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Dropdown, Space, message, Avatar, Button } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { callLogout } from "config/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isMobile } from "react-device-detect";
import type { MenuProps } from "antd";
import { setLogoutAction } from "@/redux/slice/accountSlide";
import { ALL_PERMISSIONS } from "@/config/permissions";

const { Content, Sider } = Layout;

const LayoutAdmin = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const user = useAppSelector((state) => state.account.user);
  const permissions = useAppSelector((state) => state.account.user.permission);
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (permissions?.length) {
      const viewUser = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.USERS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
      );

      const viewRole = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.ROLES.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.ROLES.GET_PAGINATE.method
      );

      const viewPermission = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.PERMISSIONS.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.USERS.GET_PAGINATE.method
      );

      const viewProfile = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.PROFILES.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.PROFILES.GET_PAGINATE.method
      );

      const viewBlog = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.BLOG.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.BLOG.GET_PAGINATE.method
      );

      const viewSend = permissions.find(
        (item) =>
          item.apiPath === ALL_PERMISSIONS.SEND.GET_PAGINATE.apiPath &&
          item.method === ALL_PERMISSIONS.SEND.GET_PAGINATE.method
      );

      const full = [
        {
          label: <Link to="/admin">Dashboard</Link>,
          key: "/admin",
          icon: <AppstoreOutlined />,
        },

        ...(viewUser
          ? [
              {
                label: <Link to="/admin/user">User</Link>,
                key: "/admin/user",
                icon: <UserOutlined />,
              },
            ]
          : []),

        ...(viewPermission
          ? [
              {
                label: <Link to="/admin/permission">Permission</Link>,
                key: "/admin/permission",
                icon: <ApiOutlined />,
              },
            ]
          : []),
        ...(viewRole
          ? [
              {
                label: <Link to="/admin/role">Role</Link>,
                key: "/admin/role",
                icon: <ExceptionOutlined />,
              },
            ]
          : []),
        ...(viewProfile
          ? [
              {
                label: <Link to="/admin/profile">Profile</Link>,
                key: "/admin/profile",
                icon: <ProfileOutlined />,
              },
            ]
          : []),
        ...(viewBlog
          ? [
              {
                label: <Link to="/admin/blog">Blog</Link>,
                key: "/admin/blog",
                icon: <FileWordOutlined />,
              },
            ]
          : []),

        ...(viewSend
          ? [
              {
                label: <Link to="/admin/send">Send</Link>,
                key: "/admin/send",
                icon: <MailOutlined />,
              },
            ]
          : []),
      ];

      setMenuItems(full);
      // console.log("Menu items set:", full);
    }
  }, [permissions, setMenuItems]);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

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
      label: <Link to={"/"}>Trang chủ</Link>,
      key: "home",
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          Đăng xuất
        </label>
      ),
      key: "logout",
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }} className="layout-admin">
        {!isMobile ? (
          <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <div
              style={{
                height: 32,
                margin: 16,
                textAlign: "center",
                color: "black",
              }}
            >
              <BugOutlined /> ADMIN
            </div>
            <Menu
              selectedKeys={[activeMenu]}
              mode="inline"
              items={menuItems}
              onClick={(e) => setActiveMenu(e.key)}
            />
          </Sider>
        ) : (
          <Menu
            selectedKeys={[activeMenu]}
            items={menuItems}
            onClick={(e) => setActiveMenu(e.key)}
            mode="horizontal"
          />
        )}

        <Layout>
          {!isMobile && (
            <div
              className="admin-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <Button
                type="text"
                icon={
                  collapsed
                    ? React.createElement(MenuUnfoldOutlined)
                    : React.createElement(MenuFoldOutlined)
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />

              <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  <Avatar>{user?.name?.substring(0, 2)?.toUpperCase()}</Avatar>
                </Space>
              </Dropdown>
            </div>
          )}
          <Content
            style={{
              padding: "15px",
              backgroundColor: "#ededed",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
