import React from "react";
import { Button, Card, Form, FormInstance, Input, message, Select } from "antd";
import userApi from "../../services/users.service";
import { UserFormType } from "../../types/users.type";
import { useAppSelector } from "../../stores/hooks";

interface UserFormProps {
    form: FormInstance<any>;
    userSelected: string;
    setUserSelected: React.Dispatch<React.SetStateAction<string>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    editMode?: boolean;
}

const UserForm = ({ form, userSelected, setUserSelected, editMode = false, setEditMode }: UserFormProps) => {
    const [createUser, { isLoading, isError, isSuccess, error }] = userApi.useCreateUserMutation();
    const [updateUser, { isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit, error: errorEdit }] = userApi.useUpdateUserMutation();
    const { user } = useAppSelector((state) => state.auth);

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
            onReset();
        }
    }, [isLoadingEdit, isErrorEdit, isSuccessEdit, errorEdit]);

    const onFinish = (data: UserFormType) => {
        if (userSelected) {
            updateUser({ userId: userSelected, formData: data });
        } else {
            createUser(data);
        }
    };

    const onReset = () => {
        form.resetFields();
        setUserSelected("");
        setEditMode(false);
    };

    return (
        <Form labelCol={{ span: 3 }} form={form} onFinish={onFinish}>
            <Card style={{ marginBottom: 16 }}>
                <Form.Item label="Họ và tên" name="fullname" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                    <Input placeholder="Nhập vào" />
                </Form.Item>
                {!editMode && (
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Vui lòng nhập thông tin" },
                            { type: "email", message: "Vui lòng nhập email" },
                        ]}
                    >
                        <Input type="email" placeholder="Nhập vào" autoComplete="off" />
                    </Form.Item>
                )}
                {!editMode && (
                    <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
                        <Input.Password placeholder="Nhập vào" autoComplete="new-password" />
                    </Form.Item>
                )}
                {user?._id !== userSelected && (
                    <Form.Item label="Chức vụ" name="role">
                        <Select>
                            <Select.Option value="MANAGER">Nhân viên</Select.Option>
                            <Select.Option value="ADMIN">Quản trị viên</Select.Option>
                        </Select>
                    </Form.Item>
                )}
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

export default UserForm;
