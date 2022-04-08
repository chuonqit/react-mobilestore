import React from "react";
import { Form, message } from "antd";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "../../../services/products.service";
import ProductForm from "../../../components/Admin/ProductForm";
import { ProductFormType, ProductUploadType } from "../../../types/products.type";

const ProductEdit = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const [fileList, setFileList] = React.useState<ProductUploadType[]>([]);
    const { data, isLoading: isLoadingData } = productApi.useFetchProductsSelectedQuery(productId);
    const [updateProduct, { isError, isLoading, isSuccess, error }] = productApi.useUpdateProductMutation();

    React.useEffect(() => {
        if (data) {
            setFileList(data?.images as ProductUploadType[]);
            form.setFieldsValue({
                ...data,
                category: data.category && data.category._id,
                brand: data.brand && data.brand._id,
            });
        }
    }, [data]);

    React.useEffect(() => {
        if (isLoading) {
            message.loading({ content: "Đang tải", duration: 1000, key: "handling" });
        }
        if (isError) {
            message.error({ content: (error as { data: string }).data, key: "handling" });
        }
        if (isSuccess) {
            navigate("/admin/products");
            message.success({ content: "Cập nhật thành công", key: "handling" });
        }
    }, [isError, isLoading, isSuccess]);

    const onFinish = (data: ProductFormType) => {
        data.images = fileList;
        updateProduct({ productId, formData: data });
    };

    return (
        <>
            <Breadcrumbs
                home={{ title: "Trang chủ", url: "/admin/dashboard" }}
                data={[{ title: "Tất cả sản phẩm", url: "/admin/products" }, { title: `Cập nhật sản phẩm` }]}
            />
            <ProductForm onFinish={onFinish} form={form} fileList={fileList} setFileList={setFileList} edit={true} loading={isLoadingData} />
        </>
    );
};

export default ProductEdit;
