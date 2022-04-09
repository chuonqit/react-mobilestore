import React from "react";
import { Button, message, Popconfirm, Select, Space, Tag } from "antd";
import { BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Admin/TableCustom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import orderApi from "../../../services/orders.services";
import { OrderStatusType, OrderType, ShippingInfoType } from "../../../types/orders.type";

interface OrdersListProps {}

const OrdersList = (props: OrdersListProps) => {
    const { data, isFetching } = orderApi.useFetchOrdersListQuery();
    const [updateOrderStatus] = orderApi.useUpdateOrderStatusMutation();
    const [deleteOrder, { isError, isLoading, isSuccess, error }] = orderApi.useDeleteOrderMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Xoá thành công", key: "handling" });
        }
    }, [isError, isLoading, isSuccess]);

    const changeStatus = (value: string, orderId: string) => {
        updateOrderStatus({ orderId, status: value }).then(() => {
            message.success("Cập nhật trạng thái thành công");
        });
    };

    const handleDeleteOrder = (orderId: string) => {
        deleteOrder(orderId);
    };

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "code",
            width: 120,
        },
        {
            title: "Chi tiết đơn hàng",
            dataIndex: "_id",
            width: 170,
            render: (orderId: string) => (
                <Space size="small">
                    <Button>
                        <Link to={`/admin/orders/${orderId}/detail`}>Chi tiết đơn hàng</Link>
                    </Button>
                </Space>
            ),
        },
        {
            title: "Trang thái",
            dataIndex: "status",
            width: 150,
            render: (status: OrderStatusType, record: OrderType) => (
                <Select value={status} onChange={(value: string) => changeStatus(value, record._id)}>
                    <Select.Option value="pending">Chưa xử lí</Select.Option>
                    <Select.Option value="processing">Xác nhận</Select.Option>
                    <Select.Option value="shipping">Đang giao</Select.Option>
                    <Select.Option value="close">Huỷ đơn</Select.Option>
                    <Select.Option value="success">Hoàn thành</Select.Option>
                </Select>
            ),
        },
        {
            title: "Người đặt hàng",
            dataIndex: "shippingInfo",
            render: (shippingInfo: ShippingInfoType) => shippingInfo.fullname,
        },
        {
            title: "Số điện thoại",
            dataIndex: "shippingInfo",
            render: (shippingInfo: ShippingInfoType) => shippingInfo.phoneNumber,
        },
        {
            title: "Ghi chú",
            dataIndex: "shippingInfo",
            render: (shippingInfo: ShippingInfoType) => shippingInfo.note,
        },
        {
            title: "Tổng tiền đơn hàng",
            dataIndex: "price",
            render: (price: number) => price?.toLocaleString("it-IT", { style: "currency", currency: "VND" }),
        },
        {
            title: "",
            dataIndex: "_id",
            fixed: "right",
            width: 90,
            render: (orderId: string, record: OrderType) => (
                <Space size="small">
                    {(record.status === "pending" || record.status === "confirm" || record.status === "shipping") && (
                        <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteOrder(orderId)} okText="Xoá" cancelText="Huỷ">
                            <Button>Xoá</Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả đơn hàng", url: "/admin/orders" }]} />
            <Button size="large" type="primary" style={{ marginBottom: 16 }}>
                <Link to="/admin/orders/new" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <BiPlusMedical style={{ marginTop: "-2px" }} />
                    Thêm 1 đơn hàng mới
                </Link>
            </Button>
            <TableCustom column={columns} data={data} loading={isFetching} scrollWidth={1500} />
        </>
    );
};

export default OrdersList;
