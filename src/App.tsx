import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRouter } from "./components/PrivateRouter";
import { Card } from "antd";

const ShopLayout = React.lazy(() => import("./components/Layouts/ShopLayout"));
const AdminLayout = React.lazy(() => import("./components/Layouts/AdminLayout"));
const ProductCategory = React.lazy(() => import("./containers/Product/ProductCategory"));
const ProductDetail = React.lazy(() => import("./containers/Product/ProductDetail"));
const Home = React.lazy(() => import("./containers/Home"));
const Cart = React.lazy(() => import("./containers/Cart"));
const Login = React.lazy(() => import("./containers/Admin/Login"));
const ProductsList = React.lazy(() => import("./containers/Admin/Products/ProductsList"));
const Dashboard = React.lazy(() => import("./containers/Admin/Dashboard"));
const Categories = React.lazy(() => import("./containers/Admin/Categories"));
const Brands = React.lazy(() => import("./containers/Admin/Brands"));
const OrdersList = React.lazy(() => import("./containers/Admin/Orders/OrdersList"));
const UsersList = React.lazy(() => import("./containers/Admin/Users/UsersList"));
const PromotionsList = React.lazy(() => import("./containers/Admin/Promotions/PromotionsList"));
const Sliders = React.lazy(() => import("./containers/Admin/Sliders"));
const ProductAdd = React.lazy(() => import("./containers/Admin/Products/ProductAdd"));
const ProductEdit = React.lazy(() => import("./containers/Admin/Products/ProductEdit"));
const Breadcrumbs = React.lazy(() => import("./components/Breadcrumbs"));
const ProductVariant = React.lazy(() => import("./containers/Admin/Products/ProductVariant"));
const Configurations = React.lazy(() => import("./containers/Admin/Configurations"));
const OrderEdit = React.lazy(() => import("./containers/Admin/Orders/OrderEdit"));
const OrderAdd = React.lazy(() => import("./containers/Admin/Orders/OrderAdd"));
const Search = React.lazy(() => import("./containers/Search"));

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ShopLayout />}>
                <Route index element={<Home />} />
                <Route path=":categoryAscii" element={<ProductCategory />} />
                <Route path=":categoryAscii/:productAscii" element={<ProductDetail />} />
                <Route path="gio-hang" element={<Cart />} />
                <Route path="tim-kiem" element={<Search />} />
            </Route>
            <Route path="/admin/signin" element={<Login />} />
            <Route
                path="/admin"
                element={
                    <PrivateRouter roles={["ADMIN", "MANAGER"]}>
                        <AdminLayout />
                    </PrivateRouter>
                }
            >
                <Route index element={<Navigate to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products">
                    <Route index element={<ProductsList />} />
                    <Route path="new" element={<ProductAdd />} />
                    <Route path=":productId/update" element={<ProductEdit />} />
                    <Route path="configurations" element={<Configurations />} />
                    <Route path="variants" element={<ProductVariant />} />
                </Route>
                <Route path="categories" element={<Categories />} />
                <Route path="brands" element={<Brands />} />
                <Route path="orders">
                    <Route index element={<OrdersList />} />
                    <Route path="new" element={<OrderAdd />} />
                    <Route path=":orderId/detail" element={<OrderEdit />} />
                </Route>
                <Route path="banners" element={<Sliders />} />
                <Route path="promotions">
                    <Route index element={<PromotionsList />} />
                    <Route path="new" element={<h1>promotions new</h1>} />
                    <Route path=":promotionId/update" element={<h1>promotions update</h1>} />
                </Route>
                <Route
                    path="forbidden"
                    element={
                        <>
                            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Lỗi truy cập", url: "/admin/forbidden" }]} />
                            <Card>
                                <strong>Không có quyền truy cập</strong>
                            </Card>
                        </>
                    }
                />
            </Route>

            <Route
                path="/admin/employees"
                element={
                    <PrivateRouter roles={["ADMIN"]}>
                        <AdminLayout />
                    </PrivateRouter>
                }
            >
                <Route index element={<UsersList />} />
                <Route path="new" element={<h1>employees new</h1>} />
                <Route path=":userId/update" element={<h1>employees update</h1>} />
            </Route>
        </Routes>
    );
};

export default App;
