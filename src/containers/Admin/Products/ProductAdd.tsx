import React from "react";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs";
import productApi from "../../../services/products.service";
import ProductForm from "../../../components/Admin/ProductForm";
import { ProductFormType, ProductUploadType } from "../../../types/products.type";

const ProductAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = React.useState<ProductUploadType[]>([]);
    const [createProduct, { isError, isLoading, isSuccess, error }] = productApi.useCreateProductMutation();

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            navigate("/admin/products");
            message.success({ content: "Thêm thành công", key: "handling" });
        }
    }, [isError, isLoading, isSuccess]);

    const onFinish = (data: ProductFormType) => {
        data.images = fileList;
        createProduct(data);
    };

    const onReset = () => {
        form.resetFields();
        setFileList([]);
    };

    return (
        <>
            <Breadcrumbs
                home={{ title: "Trang chủ", url: "/admin/dashboard" }}
                data={[
                    { title: "Tất cả sản phẩm", url: "/admin/products" },
                    { title: "Thêm sản phẩm mới", url: "/admin/products/new" },
                ]}
            />
            <ProductForm onFinish={onFinish} form={form} fileList={fileList} setFileList={setFileList} onReset={onReset} />
        </>
    );
};

export default ProductAdd;
