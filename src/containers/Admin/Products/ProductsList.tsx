import React from "react";
import { Link } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";
import Breadcrumbs from "../../../components/Breadcrumbs";
import productApi from "../../../services/products.service";
import { CategoryType } from "../../../types/categories.type";
import { ProductImageType } from "../../../types/products.type";
import TableCustom from "../../../components/Admin/TableCustom";
import { Button, Image, message, Popconfirm, Space } from "antd";
import { BrandType } from "../../../types/brands.type";

const ProductsList = () => {
    const { data, isFetching } = productApi.useFetchProductsListQuery();
    const [deleteProduct, { isError, isLoading: isLoadingDelete, isSuccess, error }] = productApi.useDeleteProductMutation();

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

    const handleDeleteProduct = (productId: string) => {
        deleteProduct(productId);
    };

    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "images",
            width: 112,
            render: (images: ProductImageType[]) => (
                <>
                    <Image style={{ width: 80, height: 80, background: "#f2f2f2", objectFit: "contain" }} src={images[0].url} />
                </>
            ),
        },
        {
            title: "Mã SKU",
            dataIndex: "sku",
            render: (sku: string) => "No." + sku,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            render: (category: CategoryType) => category && category.name,
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand",
            render: (brand: BrandType) => brand && brand.name,
        },
        {
            title: "",
            dataIndex: "_id",
            render: (productId: string) => (
                <Space size="small">
                    <Button>
                        <Link to={`/admin/products/${productId}/update`}>Cập nhật</Link>
                    </Button>
                    <Popconfirm title="Bạn có chắc muốn xoá không?" onConfirm={() => handleDeleteProduct(productId)} okText="Xoá" cancelText="Huỷ">
                        <Button>Xoá</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Breadcrumbs home={{ title: "Trang chủ", url: "/admin/dashboard" }} data={[{ title: "Tất cả sản phẩm", url: "/admin/products" }]} />
            <Button size="large" type="primary" style={{ marginBottom: 16 }}>
                <Link to="/admin/products/new" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <BiPlusMedical style={{ marginTop: "-2px" }} />
                    Thêm 1 sản phẩm mới
                </Link>
            </Button>
            <TableCustom column={columns} data={data} loading={isFetching} />
        </>
    );
};

export default ProductsList;
