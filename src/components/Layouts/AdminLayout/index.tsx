import React from "react";
import { Button, Dropdown, Layout, Menu, message, Space } from "antd";
import { Link, Outlet } from "react-router-dom";
import AdminSider from "./AdminSider";
import { ContentContainer, ContentWrapper, CssBaseLine, LayoutWrapper, Logo, Topbar, UserDropdown } from "./StyledAdmin";
import { BiBell, BiCaretDown } from "react-icons/bi";
import { clearAuth } from "../../../stores/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import socketConnect from "../../../services/socket.service";
import { adminApi } from "../../../services/baseApi.service";
import { BsRecord } from "react-icons/bs";

const { Header, Content } = Layout;

const AdminLayout = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [fetchNotification, { data: notifications }] = adminApi.useFetchNotificationMutation();

    React.useEffect(() => {
        fetchNotification();
        socketConnect.on("add-notification-server", (data) => {
            if (data) {
                message.info("Bạn có 1 thông báo mới");
                fetchNotification();
            } else {
                message.destroy();
            }
        });
    }, []);

    const logout = () => {
        message.success("Đăng xuất thành công");
        dispatch(clearAuth());
    };

    const menuNotification = (
        <Menu style={{ minHeight: "100px", minWidth: "200px" }}>
            {notifications?.map((noti, index) => (
                <Menu.Item key={index}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <BsRecord style={{ marginTop: "-2px" }} size={18} /> {noti.message}
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

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
                <Space>
                    <Dropdown overlay={menuNotification} placement="bottom" trigger={["click"]} arrow={{ pointAtCenter: true }}>
                        <Button style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <BiBell size={16} style={{ marginTop: "-1px" }} />
                            Thông báo
                        </Button>
                    </Dropdown>
                    <UserDropdown>
                        <Dropdown.Button overlay={menu} trigger={["click"]} icon={<BiCaretDown />}>
                            Xin chào: {user?.firstName}
                        </Dropdown.Button>
                    </UserDropdown>
                </Space>
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
