import { Button, Card, Form, FormInstance, Input, InputNumber, message, Select } from "antd";
import React from "react";
import { BsTrash } from "react-icons/bs";
import orderApi from "../../services/orders.services";
import productApi from "../../services/products.service";
import { ProductType } from "../../types/products.type";

interface OrderFormProps {
    form: FormInstance<any>;
    loading?: boolean;
    onFinish: (values: any) => void;
}

const OrderForm = ({ form, loading = false, onFinish }: OrderFormProps) => {
    const { data: variants } = productApi.useFetchProductVariantsListQuery();
    const { data: products } = productApi.useFetchProductsListQuery();
    const [totalPrice, setTotalPrice] = React.useState<number>(0);

    const checkPrice = () => {
        let total = 0;
        const formProducts = form.getFieldsValue();
        for (let product of formProducts.products) {
            if (product.product !== undefined) {
                if ((product.cost !== undefined || product.cost === null) && product.cost > 0) {
                    total += product.quantity * product.cost;
                } else {
                    total += product.quantity * product.price;
                }
            }
        }
        form.setFieldsValue({ price: total });
        setTotalPrice(total);
    };

    return (
        <Form layout="vertical" form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16 }}>
                {!loading && (
                    <>
                        <Form.Item label="Tên người đặt hàng" name="fullname" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                            <Input placeholder="Nhập vào" autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Số điện thoại người đặt hàng" name="phoneNumber" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                            <Input placeholder="Nhập vào" autoComplete="off" />
                        </Form.Item>
                        <Form.Item
                            label="Email người đặt hàng"
                            name="email"
                            rules={[
                                { required: true, message: "Vui lòng nhập thông tin" },
                                { type: "email", message: "Vui lòng nhập email" },
                            ]}
                        >
                            <Input placeholder="Nhập vào" autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Địa chỉ nhận hàng" name="address" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                            <Input placeholder="Nhập vào" autoComplete="off" />
                        </Form.Item>
                        <Form.Item label="Ghi chú" name="note">
                            <Input.TextArea placeholder="Nhập vào" autoComplete="off" rows={5} />
                        </Form.Item>

                        <Form.List name="products">
                            {(fields, { add, remove }) => (
                                <>
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}
                                        >
                                            Thêm sản phẩm
                                        </Button>
                                    </Form.Item>
                                    {fields.map((field) => (
                                        <Input.Group compact key={field.key}>
                                            <Form.Item
                                                name={[field.name, "product"]}
                                                style={{ marginBottom: 0, marginTop: 16, width: "25%" }}
                                                rules={[{ required: true, message: "Vui lòng chọn thông tin" }]}
                                            >
                                                <Select placeholder="Sản phẩm" style={{ width: "100%" }} allowClear>
                                                    {products?.map((product) => (
                                                        <Select.Option key={product._id}>{product.name}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, "quantity"]}
                                                style={{ marginBottom: 0, marginTop: 16, width: "10%" }}
                                                rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}
                                            >
                                                <InputNumber min={1} placeholder="Số lượng" style={{ width: "100%" }} onChange={checkPrice} />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, "price"]}
                                                style={{ marginBottom: 0, marginTop: 16, width: "15%" }}
                                                rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}
                                            >
                                                <InputNumber min={1} placeholder="Giá tiền" style={{ width: "100%" }} onChange={checkPrice} />
                                            </Form.Item>
                                            <Form.Item name={[field.name, "cost"]} style={{ marginBottom: 0, marginTop: 16, width: "15%" }}>
                                                <InputNumber min={1} placeholder="Giá đã giảm" style={{ width: "100%" }} onChange={checkPrice} />
                                            </Form.Item>
                                            <Form.Item name={[field.name, "storage"]} style={{ marginBottom: 0, marginTop: 16, width: "15%" }}>
                                                <Select placeholder="Bộ nhớ" style={{ width: "100%" }} showSearch allowClear>
                                                    {variants
                                                        ?.filter((x) => x.type === "storage")
                                                        .map((variant) => (
                                                            <Select.Option key={variant.nameAscii}>{variant.name}</Select.Option>
                                                        ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item name={[field.name, "color"]} style={{ marginBottom: 0, marginTop: 16, width: "15%" }}>
                                                <Select placeholder="Màu sắc" style={{ width: "100%" }} showSearch allowClear>
                                                    {variants
                                                        ?.filter((x) => x.type === "color")
                                                        .map((variant) => (
                                                            <Select.Option key={variant._id}>{variant.name}</Select.Option>
                                                        ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item style={{ marginBottom: 0, marginTop: 16, width: "5%" }}>
                                                <Button
                                                    onClick={() => {
                                                        remove(field.name);
                                                        checkPrice();
                                                    }}
                                                    block
                                                    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                >
                                                    <BsTrash />
                                                </Button>
                                            </Form.Item>
                                        </Input.Group>
                                    ))}
                                </>
                            )}
                        </Form.List>

                        <Form.Item label="Tổng tiền" name="price" style={{ marginTop: 16 }}>
                            <Input disabled={true} />
                        </Form.Item>

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                            <Button htmlType="submit" type="primary" style={{ minWidth: 150 }}>
                                Lưu
                            </Button>
                        </div>
                    </>
                )}
            </Card>
        </Form>
    );
};

export default OrderForm;
