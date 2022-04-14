import React from "react";
import { Layout, Menu } from "antd";
import { MenuSub, Sidebar } from "./StyledAdmin";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const AdminSider = () => {
    const location = useLocation();

    return (
        <Sidebar as={Sider} width={280} collapsedWidth="0" breakpoint="lg">
            <Menu
                theme="light"
                mode="inline"
                style={{ height: "100%" }}
                defaultSelectedKeys={["/admin/dashboard"]}
                selectedKeys={[location.pathname]}
                defaultOpenKeys={["main", "product", "category", "order", "setting"]}
            >
                <MenuSub as={SubMenu} key="main" title="Mục chính">
                    <Menu.Item key="/admin/dashboard">
                        <Link to="/admin/dashboard">Bảng điều khiển</Link>
                    </Menu.Item>
                </MenuSub>
                <MenuSub as={SubMenu} key="order" title="Đơn hàng">
                    <Menu.Item key="/admin/orders">
                        <Link to="/admin/orders">Tất cả đơn hàng</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/orders/new">
                        <Link to="/admin/orders/new">Thêm đơn hàng mới</Link>
                    </Menu.Item>
                </MenuSub>
                <MenuSub as={SubMenu} key="product" title="Sản phẩm - Thuộc tính">
                    <Menu.Item key="/admin/products">
                        <Link to="/admin/products">Tất cả sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/products/new">
                        <Link to="/admin/products/new">Thêm sản phẩm mới</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/products/variants">
                        <Link to="/admin/products/variants">Biến thể sản phẩm</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/products/configurations">
                        <Link to="/admin/products/configurations">Cấu hình sản phẩm</Link>
                    </Menu.Item>
                </MenuSub>
                <MenuSub as={SubMenu} key="category" title="Danh mục - Thương hiệu">
                    <Menu.Item key="/admin/categories">
                        <Link to="/admin/categories">Danh mục</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/brands">
                        <Link to="/admin/brands">Thương hiệu</Link>
                    </Menu.Item>
                </MenuSub>
                <MenuSub as={SubMenu} key="setting" title="Khác">
                    <Menu.Item key="/admin/banners">
                        <Link to="/admin/banners">Quản lí banners</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/employees">
                        <Link to="/admin/employees">Quản lí nhân viên</Link>
                    </Menu.Item>
                </MenuSub>
            </Menu>
        </Sidebar>
    );
};

export default AdminSider;
