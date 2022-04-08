import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import configurationApi from "../../../services/configurations.service";
import { Button, Form, message, Popconfirm, Space } from "antd";
import TableCustom from "../../../components/Admin/TableCustom";
import ConfigurationForm from "../../../components/Admin/ConfigurationForm";

const Configurations = () => {
    const [form] = Form.useForm();
    const { data, isFetching } = configurationApi.useFetchConfigurationsListQuery();
    const [configurationSelected, setConfigurationSelected] = React.useState<string>("");
    const [deleteConfiguration, { isError, isLoading: isLoadingDelete, isSuccess, error }] = configurationApi.useDeleteConfigurationMutation();

    React.useEffect(() => {
        if (isLoadingDelete) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            message.success({ content: "Xoá thành công", key: "handling" });
        }
    }, [isError, isLoadingDelete, isSuccess]);

    const handleDeleteConfiguration = (configurationId: string) => {
        deleteConfiguration(configurationId);
    };

    const handleEdit = (configurationId: string) => {
        form.setFieldsValue(data?.find((configuration) => configuration._id === configurationId));
        setConfigurationSelected(configurationId);
    };

    const columns = [
        {
            title: "Tên cấu hình",
            dataIndex: "name",
        },
        {
            title: "",
            dataIndex: "_id",
            render: (configurationId: string) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(configurationId)}>Cập nhật</Button>
                    <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteConfiguration(configurationId)} okText="Xoá" cancelText="Huỷ">
                        <Button>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả cấu hình", url: "/admin/configurations" }]} />
            <ConfigurationForm form={form} configurationSelected={configurationSelected} setConfigurationSelected={setConfigurationSelected} />
            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default Configurations;
