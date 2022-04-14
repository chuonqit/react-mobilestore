import React from "react";
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Space, Tag } from "antd";
import { BiImport, BiPlusMedical } from "react-icons/bi";
import { Link } from "react-router-dom";
import TableCustom from "../../../components/Admin/TableCustom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import userApi from "../../../services/users.service";
import { UserExcelFormType, UserType } from "../../../types/users.type";
import { useAppSelector } from "../../../stores/hooks";
import UserForm from "../../../components/Admin/UserForm";

interface UsersListProps {}

const UsersList = (props: UsersListProps) => {
    const [form] = Form.useForm();
    const [userSelected, setUserSelected] = React.useState<string>("");
    const [editMode, setEditMode] = React.useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
    const [userExcel, setUserExcel] = React.useState<UserExcelFormType[]>([]);
    const [getUserExcel] = userApi.useGetUserExcelMutation();
    const [startIndex, setStartIndex] = React.useState<number>(1);
    const [importUserExcel, { isLoading, isError, isSuccess, error }] = userApi.useImportUserExcelMutation();
    const { data, isFetching } = userApi.useFetchUsersListQuery();
    const [deleteUser, { isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete, error: errorDelete }] = userApi.useDeleteUserMutation();
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
            setUserExcel([]);
            setStartIndex(1);
            setIsModalVisible(false);
        }
    }, [isLoading, isError, isSuccess, error]);

    React.useEffect(() => {
        if (isLoadingDelete) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isErrorDelete) {
            message.error({ content: (errorDelete as { data: string }).data, key: "handling" });
        }
        if (isSuccessDelete) {
            message.success({ content: "Xoá thành công", key: "handling" });
        }
    }, [isLoadingDelete, isErrorDelete, isSuccessDelete, errorDelete]);

    const formSubmit = (e: any) => {
        e.preventDefault();
        if (e.target.excel.files.length > 0) {
            const formData = new FormData();
            formData.append("excel", e.target.excel.files[0]);
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
            getUserExcel(formData).then((response: any) => {
                message.success({ content: "Thêm thành công", key: "handling" });
                setUserExcel(response.data);
            });
        } else {
            message.error("Vui lòng chọn file");
        }
    };

    const formSubmitImport = (e: any) => {
        e.preventDefault();
        message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        const formData = userExcel.filter((item, key) => key >= startIndex - 1);
        importUserExcel(formData).then(() => {
            message.success({ content: "Thêm thành công", key: "handling" });
        });
    };

    const handleDeleteUser = (userId: string) => {
        deleteUser(userId);
    };

    const handleEdit = (userId: string) => {
        form.setFieldsValue(data?.find((user) => user._id === userId));
        setUserSelected(userId);
        setEditMode(true);
    };

    const columns = [
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Họ và tên",
            dataIndex: "fullname",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
        },
        {
            title: "Chức vụ",
            dataIndex: "role",
            render: (role: "ADMIN" | "MANAGER" | undefined) => {
                if (role === "ADMIN") {
                    return <Tag color="blue">Quản trị viên</Tag>;
                } else if (role === "MANAGER") {
                    return <Tag color="pink">Nhân viên</Tag>;
                } else if (role === undefined) {
                    return <Tag>Chưa cấp quyền</Tag>;
                }
            },
        },
        {
            title: "",
            dataIndex: "_id",
            fixed: "right",
            width: 90,
            render: (userId: string) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(userId)}>Cập nhật</Button>
                    {user?._id !== userId && (
                        <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteUser(userId)} okText="Xoá" cancelText="Huỷ">
                            <Button>Xoá</Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả nhân viên", url: "/admin/employees" }]} />

            <Button size="large" type="primary" style={{ marginBottom: 16 }} onClick={() => setIsModalVisible(true)}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <BiImport style={{ marginTop: "-2px" }} />
                    Import Excel
                </div>
            </Button>

            <UserForm form={form} userSelected={userSelected} setUserSelected={setUserSelected} editMode={editMode} setEditMode={setEditMode} />

            <Modal title="Import Excel" visible={isModalVisible} closable={false} footer={null} width="1000px">
                {userExcel.length === 0 ? (
                    <form onSubmit={formSubmit}>
                        <Input type="file" name="excel" />
                        <Space style={{ marginTop: 16 }}>
                            <Button
                                htmlType="button"
                                onClick={() => {
                                    setUserExcel([]);
                                    setStartIndex(1);
                                    setIsModalVisible(false);
                                }}
                            >
                                Huỷ
                            </Button>
                            <Button htmlType="submit" type="primary">
                                Thực hiện
                            </Button>
                        </Space>
                    </form>
                ) : (
                    <>
                        <form onSubmit={formSubmitImport} style={{ marginBottom: 16 }}>
                            <label>Lấy dữ liệu từ dòng số:</label>
                            <InputNumber min={1} name="startIndex" onChange={(value: number) => setStartIndex(value)} defaultValue={1} style={{ marginLeft: 10 }} />
                            <Space style={{ marginLeft: 16 }}>
                                <Button htmlType="submit" type="primary">
                                    Lưu
                                </Button>
                                <Button
                                    htmlType="button"
                                    onClick={() => {
                                        setUserExcel([]);
                                        setStartIndex(1);
                                    }}
                                >
                                    Huỷ
                                </Button>
                            </Space>
                        </form>
                        <TableCustom
                            column={[
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                },
                                {
                                    title: "Họ và tên",
                                    dataIndex: "fullname",
                                },
                                {
                                    title: "Số điện thoại",
                                    dataIndex: "phoneNumber",
                                },
                                {
                                    title: "Chức vụ",
                                    dataIndex: "role",
                                },
                            ]}
                            data={userExcel}
                            loading={isFetching}
                        />
                    </>
                )}
            </Modal>

            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default UsersList;
