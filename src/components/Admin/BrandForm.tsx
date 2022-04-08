import React from "react";
import brandApi from "../../services/brands.service";
import { BrandFormType } from "../../types/brands.type";
import { Button, Card, Form, FormInstance, Input, message } from "antd";

interface BrandFormProps {
    form: FormInstance<any>;
    brandSelected: string;
    setBrandSelected: React.Dispatch<React.SetStateAction<string>>;
}

const BrandForm = ({ form, brandSelected, setBrandSelected }: BrandFormProps) => {
    const [createBrand, { isLoading, isError, isSuccess, error }] = brandApi.useCreateBrandMutation();
    const [updateBrand, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit, error: errorEdit }] = brandApi.useUpdateBrandMutation();

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
            setBrandSelected("");
            form.resetFields();
        }
    }, [isLoadingEdit, isErrorEdit, isSuccessEdit, errorEdit]);

    const onFinish = (data: BrandFormType) => {
        if (brandSelected) {
            updateBrand({ brandId: brandSelected, formData: data });
        } else {
            createBrand(data);
        }
    };

    const onReset = () => {
        form.resetFields();
        setBrandSelected("");
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16 }}>
                <Form.Item label="Tên thương hiệu" name="name" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input placeholder="Nhập vào" autoComplete="off" />
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

export default BrandForm;
