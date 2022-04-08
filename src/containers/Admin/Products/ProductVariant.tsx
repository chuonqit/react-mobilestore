import React from "react";
import { Button, Form, message, Popconfirm, Space } from "antd";
import TableCustom from "../../../components/Admin/TableCustom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import productApi from "../../../services/products.service";
import ProductVariantForm from "../../../components/Admin/ProductVariantForm";

const ProductVariant = () => {
    const [form] = Form.useForm();
    const { data, isFetching } = productApi.useFetchProductVariantsListQuery();
    const [productVariantSelected, setProductVariantSelected] = React.useState<string>("");
    const [deleteProductVariant, { isError, isLoading: isLoadingDelete, isSuccess, error }] = productApi.useDeleteProductVariantMutation();

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

    const handleDeleteProductVariant = (productVariantId: string) => {
        deleteProductVariant(productVariantId);
    };

    const handleEdit = (productVariantId: string) => {
        form.setFieldsValue(data?.find((productVarint) => productVarint._id === productVariantId));
        setProductVariantSelected(productVariantId);
    };

    const columns = [
        {
            title: "Tên biến thể",
            dataIndex: "name",
        },
        {
            title: "Loại biến thể",
            dataIndex: "type",
        },
        {
            title: "",
            dataIndex: "_id",
            render: (productVariantId: string) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(productVariantId)}>Cập nhật</Button>
                    <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteProductVariant(productVariantId)} okText="Xoá" cancelText="Huỷ">
                        <Button>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả biến thể", url: "/admin/products/variants" }]} />
            <ProductVariantForm form={form} productVariantSelected={productVariantSelected} setProductVariantSelected={setProductVariantSelected} />
            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default ProductVariant;
