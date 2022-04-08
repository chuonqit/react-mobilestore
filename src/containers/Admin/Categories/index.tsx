import React from "react";
import categoryApi from "../../../services/categories.service";
import { Button, Form, message, Popconfirm, Space } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import TableCustom from "../../../components/Admin/TableCustom";
import CategoryForm from "../../../components/Admin/CategoryForm";

const Categories = () => {
    const [form] = Form.useForm();
    const { data, isFetching } = categoryApi.useFetchCategoriesListQuery();
    const [checkProductsCategory] = categoryApi.useLazyCheckProductsCategoryQuery();
    const [categorySelected, setCategorySelected] = React.useState<string>("");
    const [deleteCategory, { isError, isLoading: isLoadingDelete, isSuccess, error }] = categoryApi.useDeleteCategoryMutation();
    const [imageUrl, setImageUrl] = React.useState<{ url?: string; base64?: string }>({ url: "", base64: "" });

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

    const handleDeleteCategory = (categoryId: string) => {
        checkProductsCategory(categoryId).then(({ data }) => {
            if (data?.existed) {
                message.error({ content: "Danh mục vẫn tồn tại sản phẩm", key: "handling" });
                return;
            }
            deleteCategory(categoryId);
        });
    };

    const handleEdit = (categoryId: string) => {
        const category = data?.find((category) => category._id === categoryId);
        form.setFieldsValue(category);
        setImageUrl({
            url: category?.image,
        });
        setCategorySelected(categoryId);
    };

    const columns = [
        {
            title: "Tên danh mục",
            dataIndex: "name",
        },
        {
            title: "",
            dataIndex: "_id",
            render: (categoryId: string) => (
                <Space size="small">
                    <Button onClick={() => handleEdit(categoryId)}>Cập nhật</Button>
                    <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteCategory(categoryId)} okText="Xoá" cancelText="Huỷ">
                        <Button>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả danh mục", url: "/admin/categories" }]} />
            <CategoryForm form={form} categorySelected={categorySelected} setCategorySelected={setCategorySelected} imageUrl={imageUrl} setImageUrl={setImageUrl} />
            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default Categories;
