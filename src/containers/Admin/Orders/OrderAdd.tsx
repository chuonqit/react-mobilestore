import React from "react";
import { Form, message } from "antd";
import OrderForm from "../../../components/Admin/OrderForm";
import Breadcrumbs from "../../../components/Breadcrumbs";
import orderApi from "../../../services/orders.services";
import { useNavigate } from "react-router-dom";

interface OrderAddProps {}

const OrderAdd = (props: OrderAddProps) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [createOrder, { isError, isLoading, isSuccess, error }] = orderApi.useCreateOrderMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            navigate("/admin/orders");
            message.success({ content: "Thêm thành công", key: "handling" });
        }
    }, [isError, isLoading, isSuccess]);

    const onFinish = (data: any) => {
        createOrder(data);
    };

    return (
        <>
            <Breadcrumbs
                home={{ title: "Trang chủ", url: "/admin/dashboard" }}
                data={[{ title: "Tất cả đơn hàng", url: "/admin/orders" }, { title: `Thêm đơn hàng mới` }]}
            />
            <OrderForm form={form} onFinish={onFinish} />
        </>
    );
};

export default OrderAdd;
