import React from "react";
import { BsTrash } from "react-icons/bs";
import { Button, Card, Form, FormInstance, Input, InputNumber, message, Select, Typography } from "antd";
import { ProductVariantFormType } from "../../types/products.type";
import productApi from "../../services/products.service";

interface ProductVariantFormProps {
    form: FormInstance<any>;
    productVariantSelected: string;
    setProductVariantSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ProductVariantForm = ({ form, productVariantSelected, setProductVariantSelected }: ProductVariantFormProps) => {
    const [createProductVariant, { isLoading, isError, isSuccess, error }] = productApi.useCreateProductVariantMutation();
    const [updateProductVariant, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit, error: errorEdit }] =
        productApi.useUpdateProductVariantMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Thêm thành công", key: "handling" });
            form.resetFields();
        }
    }, [isLoading, isError, isSuccess, error]);

    React.useEffect(() => {
        if (isLoadingEdit) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isErrorEdit) {
            message.error({ content: (errorEdit as { data: string }).data, key: "handling" });
        }
        if (isSuccessEdit) {
            message.success({ content: "Cập nhật thành công", key: "handling" });
            setProductVariantSelected("");
            form.resetFields();
        }
    }, [isLoadingEdit, isErrorEdit, isSuccessEdit, errorEdit]);

    const onFinish = (data: ProductVariantFormType) => {
        if (productVariantSelected) {
            updateProductVariant({ productVariantId: productVariantSelected, formData: data });
        } else {
            createProductVariant(data);
        }
    };

    const onReset = () => {
        form.resetFields();
        setProductVariantSelected("");
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16 }}>
                <Form.Item label="Tên biến thể" name="name" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input placeholder="Nhập vào" autoComplete="off" />
                </Form.Item>
                <Form.Item label="Loại biến thể" name="type" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Select placeholder="Biến thể" style={{ width: "100%" }} allowClear>
                        <Select.Option key="color">Màu sắc</Select.Option>
                        <Select.Option key="storage">Bộ nhớ</Select.Option>
                    </Select>
                </Form.Item>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                    <Button htmlType="button" onClick={onReset}>
                        Huỷ bỏ
                    </Button>
                    <Button htmlType="submit" type="primary" style={{ minWidth: 150 }}>
                        Lưu
                    </Button>
                </div>
            </Card>
        </Form>
    );
};

export default ProductVariantForm;
