import { Form, message } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderForm from "../../../components/Admin/OrderForm";
import Breadcrumbs from "../../../components/Breadcrumbs";
import orderApi from "../../../services/orders.services";

interface OrderEditProps {}

const OrderEdit = (props: OrderEditProps) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();
    const { data, isFetching } = orderApi.useFetchOrderSelectedQuery(orderId);
    const [updateOrder, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit, error: errorEdit }] = orderApi.useUpdateOrderMutation();

    React.useEffect(() => {
        if (data) {
            form.setFieldsValue({ ...data, ...data.shippingInfo });
        }
    }, [data]);

    React.useEffect(() => {
        if (isLoadingEdit) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isErrorEdit) {
            message.error({ content: (errorEdit as { data: string }).data, key: "handling" });
        }
        if (isSuccessEdit) {
            navigate("/admin/orders");
            message.success({ content: "Cập nhật thành công", key: "handling" });
        }
    }, [isLoadingEdit, isErrorEdit, isSuccessEdit, errorEdit]);

    const onFinish = (data: any) => {
        updateOrder({ orderId, formData: data });
    };

    return (
        <>
            <Breadcrumbs
                home={{ title: "Trang chủ", url: "/admin/dashboard" }}
                data={[{ title: "Tất cả đơn hàng", url: "/admin/orders" }, { title: `Thông tin đơn hàng` }]}
            />
            <OrderForm form={form} loading={isFetching} onFinish={onFinish} />
        </>
    );
};

export default OrderEdit;
