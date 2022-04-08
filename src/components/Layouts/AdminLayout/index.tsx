import React from "react";
import { Dropdown, Layout, Menu, message } from "antd";
import { Link, Outlet } from "react-router-dom";
import AdminSider from "./AdminSider";
import { ContentContainer, ContentWrapper, CssBaseLine, LayoutWrapper, Logo, Topbar, UserDropdown } from "./StyledAdmin";
import { BiCaretDown } from "react-icons/bi";
import { clearAuth } from "../../../stores/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";

const { Header, Content } = Layout;

const AdminLayout = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const logout = () => {
        message.success("Đăng xuất thành công");
        dispatch(clearAuth());
    };

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <Link to="/admin/dashboard">Thông tin tài khoản</Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to="/admin/dashboard">Đổi mật khẩu</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" onClick={logout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    return (
        <LayoutWrapper as={Layout}>
            <Topbar as={Header}>
                <Link to="/">
                    <Logo>BOOTMOBILE</Logo>
                </Link>
                <UserDropdown>
                    <Dropdown.Button overlay={menu} trigger={["click"]} icon={<BiCaretDown />}>
                        Xin chào: {user?.firstName}
                    </Dropdown.Button>
                </UserDropdown>
            </Topbar>
            <Layout>
                <AdminSider />
                <ContentWrapper as={Content}>
                    <ContentContainer>
                        <Outlet />
                    </ContentContainer>
                </ContentWrapper>
            </Layout>
            <CssBaseLine />
        </LayoutWrapper>
    );
};

export default AdminLayout;
