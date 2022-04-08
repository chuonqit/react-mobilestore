import React from "react";
import ConfigurationApi from "../../services/configurations.service";
import { ConfigurationFormType } from "../../types/configurations.type";
import { Button, Card, Form, FormInstance, Input, message, Select } from "antd";

interface ConfigurationFormProps {
    form: FormInstance<any>;
    configurationSelected: string;
    setConfigurationSelected: React.Dispatch<React.SetStateAction<string>>;
}

const ConfigurationForm = ({ form, configurationSelected, setConfigurationSelected }: ConfigurationFormProps) => {
    const [createConfiguration, { isLoading, isError, isSuccess, error }] = ConfigurationApi.useCreateConfigurationMutation();
    const [updateConfiguration, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit, error: errorEdit }] =
        ConfigurationApi.useUpdateConfigurationMutation();

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
            setConfigurationSelected("");
            form.resetFields();
        }
    }, [isLoadingEdit, isErrorEdit, isSuccessEdit, errorEdit]);

    const onFinish = (data: ConfigurationFormType) => {
        if (configurationSelected) {
            updateConfiguration({ configurationId: configurationSelected, formData: data });
        } else {
            createConfiguration(data);
        }
    };

    const onReset = () => {
        form.resetFields();
        setConfigurationSelected("");
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16, width: "100%" }}>
                <div style={{ display: "flex", gap: 10 }}>
                    <Form.Item label="Tên cấu hình" name="name" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]} style={{ flex: 2 }}>
                        <Input placeholder="Nhập vào" autoComplete="off" />
                    </Form.Item>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
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

export default ConfigurationForm;
