import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import brandApi from "../../../services/brands.service";
import BrandForm from "../../../components/Admin/BrandForm";
import TableCustom from "../../../components/Admin/TableCustom";
import { Button, Form, message, Popconfirm, Space } from "antd";

const Brands = () => {
    const [form] = Form.useForm();
    const { data, isFetching } = brandApi.useFetchBrandsListQuery();
    const [brandSelected, setBrandSelected] = React.useState<string>("");
    const [checkProductsBrand] = brandApi.useLazyCheckProductsBrandQuery();
    const [deleteBrand, { isError, isLoading: isLoadingDelete, isSuccess, error }] = brandApi.useDeleteBrandMutation();

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

    const handleDeleteBrand = (brandId: string) => {
        checkProductsBrand(brandId).then(({ data }) => {
            if (data?.existed) {
                message.error({ content: "Thương hiệu vẫn tồn tại sản phẩm", key: "handling" });
                return;
            }
            deleteBrand(brandId);
        });
    };

    const handleEdit = (brandId: string) => {
        form.setFieldsValue(data?.find((brand) => brand._id === brandId));
        setBrandSelected(brandId);
    };

    const columns = [
        {
            title: "Tên thương hiệu",
            dataIndex: "name",
        },
        {
            title: "",
            dataIndex: "_id",
            render: (brandId: string) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(brandId)}>Cập nhật</Button>
                    <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteBrand(brandId)} okText="Xoá" cancelText="Huỷ">
                        <Button>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả thương hiệu", url: "/admin/brands" }]} />
            <BrandForm form={form} brandSelected={brandSelected} setBrandSelected={setBrandSelected} />
            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default Brands;
