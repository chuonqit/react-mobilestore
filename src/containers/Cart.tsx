import React from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { BiTrash } from "react-icons/bi";
import { BsFillCartXFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { changeCartQuantity, clearCart, removeCartItem } from "../stores/slices/cart.slice";
import storeApi from "../services/storeApi.service";
import socketConnect from "../services/socket.service";

import "./Product/product.scss";

interface CartProps {}

const Cart = (props: CartProps) => {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const { carts } = useAppSelector((state) => state.carts);
    const [orderByCustomer, { isLoading, isSuccess, isError, error }] = storeApi.useOrderByCustomerMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Đặt hàng thành công", key: "handling" });
            dispatch(clearCart());
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
    }, [isError, error, isLoading, isSuccess, dispatch]);

    const changeQuantity = (quantity: number, index: number) => {
        dispatch(changeCartQuantity({ quantity, index }));
        message.success("Thay đổi số lượng thành công");
    };

    const onFinish = (data: any) => {
        data.products = carts.products;
        data.price = carts.totalPrice;
        socketConnect.emit("add-notification-client", `Có đơn hàng mới từ ${data.fullname}`);
        orderByCustomer(data);
    };

    return (
        <div className="ms-wrapper mini">
            <Breadcrumbs data={[{ title: "Giỏ hàng", url: "/gio-hang" }]} />
            <div className="ms-card">
                <div className="ms-card-head">
                    <div className="ms-card-title">Có {carts.products.length} sản phẩm trong giỏ hàng</div>
                </div>
                {carts.products.length > 0 ? (
                    <Form onFinish={onFinish} layout="vertical" autoComplete="off">
                        <div className="ms-card-body">
                            <div className="ms-cart__product">
                                {carts.products.map((item, index) => (
                                    <div className="ms-cart__product-item" key={index}>
                                        <div className="ms-cart__product-item-img">
                                            <img src={item.productImage} />
                                        </div>
                                        <div className="ms-cart__product-item-info">
                                            <div className="ms-cart__product-item-info-name">
                                                {item.productStorage ? (
                                                    <Link to={`${item.productURL}?dung-luong=${item.storage}`}>
                                                        {item.productName} {item.productStorage}
                                                    </Link>
                                                ) : (
                                                    <Link to={item.productURL}>{item.productName}</Link>
                                                )}

                                                {item.productColor && (
                                                    <div>
                                                        <strong>Màu sắc:</strong> {item.productColor}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ms-cart__product-item-info-quantity">
                                                <InputNumber min={1} value={item.quantity} onChange={(value: number) => changeQuantity(value, index)} />
                                                <Button size="small" onClick={() => dispatch(removeCartItem(index))}>
                                                    <BiTrash /> Xoá
                                                </Button>
                                            </div>
                                            <div className="ms-cart__product-item-info-price">
                                                {item.productCost === undefined || item.productCost === null || item.cost === undefined || item.cost === null ? (
                                                    <div className="cs-price--main">{item.price?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</div>
                                                ) : (
                                                    <>
                                                        <div className="cs-price--main">{item.cost?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</div>
                                                        <div className="cs-price--sub">{item.price?.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="ms-card-info">
                                <div className="form">
                                    <Form.Item name="fullname" rules={[{ required: true, message: "Vui lòng điền họ tên Anh/Chị" }]}>
                                        <Input placeholder="Họ và tên Anh/Chị" />
                                    </Form.Item>
                                    <Form.Item name="phoneNumber" rules={[{ required: true, message: "Vui lòng điền số điện thoại" }]}>
                                        <Input placeholder="Số điện thoại lên hệ" />
                                    </Form.Item>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            { required: true, message: "Vui lòng điền email" },
                                            { type: "email", message: "Vui lòng điền email" },
                                        ]}
                                    >
                                        <Input placeholder="Địa chỉ email" />
                                    </Form.Item>
                                    <Form.Item name="address" rules={[{ required: true, message: "Vui lòng điền địa chỉ nhận hàng" }]}>
                                        <Input placeholder="Địa chỉ nhận hàng" />
                                    </Form.Item>
                                    <Form.Item name="note">
                                        <Input.TextArea placeholder="Ghi chú" rows={5} style={{ resize: "none" }} />
                                    </Form.Item>
                                </div>
                                <div className="ms-cart-total">
                                    <p className="ms-cart-total-normal">
                                        <span>Tổng tiền:</span>
                                        <span>{carts?.totalPrice.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                    </p>
                                    <p className="ms-cart-total-lg">
                                        <span>Cần thanh toán:</span>
                                        <span>{carts?.totalPrice.toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                    </p>
                                    <div className="ms-cart-button">
                                        <Button type="primary" htmlType="submit" size="large">
                                            Hoàn tất đặt hàng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                ) : (
                    <div className="ms-cart-empty">
                        <BsFillCartXFill />
                        <div className="text">Không có sản phẩm nào trong giỏ hàng</div>
                        <Link to="/">
                            <Button type="primary" size="large">
                                Về trang chủ
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
