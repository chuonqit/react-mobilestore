import React from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import ProductThumb from "../../components/ProductThumb";
import ProductSlide from "../../components/ProductSlide";
import storeApi from "../../services/storeApi.service";
import { addToCart } from "../../stores/slices/cart.slice";
import { useAppDispatch } from "../../stores/hooks";
import { Button, message, Radio } from "antd";

import "./product.scss";

interface ProductDetailProps {}

const ProductDetail = (props: ProductDetailProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const { productAscii, categoryAscii } = useParams<{ productAscii: string; categoryAscii: string }>();
    const [productPrice, setProductPrice] = React.useState<{
        price?: number;
        cost?: number;
    }>();
    const [productColor, setProductColor] = React.useState<{ color: { _id: string; name: string }; stock: number }[]>([]);
    const [colorSelected, setColorSelected] = React.useState<string>("");
    const [storageSelected, setStorageSelected] = React.useState<string>("");
    const { data: productSelected, isLoading } = storeApi.useFetchProductsSelectedQuery(productAscii);
    const { data: productRelated, isLoading: isLoadingRelated } = storeApi.useFetchProductsRelatedQuery(productAscii);

    React.useEffect(() => {
        if (productSelected === null) {
            navigate("/", { replace: true });
        }
    }, [productSelected]);

    React.useEffect(() => {
        if (productSelected?.variants.length !== 0) {
            let defaultVariant: any = [];
            if (searchParams.get("dung-luong")) {
                setStorageSelected(searchParams.get("dung-luong")!);
                defaultVariant = productSelected?.variants.find((x) => x.storage.nameAscii === searchParams.get("dung-luong"));
            } else {
                defaultVariant = productSelected?.variants[0];
                setStorageSelected(productSelected?.variants[0].storage.nameAscii!);
            }
            setProductPrice({
                price: defaultVariant?.price,
                cost: defaultVariant?.cost,
            });
            setProductColor(defaultVariant?.colors!);
            setColorSelected(defaultVariant?.colors[0].color._id!);
        }
    }, [searchParams, productSelected]);

    const addToCartHandle = () => {
        const color = productColor !== undefined ? productColor.find((x) => x.color._id === colorSelected)?.color.name : "";
        dispatch(
            addToCart({
                products: {
                    productStorage: productSelected?.variants.find((x) => x.storage.nameAscii === storageSelected)?.storage.name || "",
                    productURL: `/${categoryAscii}/${productAscii}`,
                    productColor: color!,
                    productImage: productSelected?.images[0].url!,
                    productName: productSelected?.name!,
                    productPrice: productPrice?.price! || productSelected?.price!,
                    productCost: productPrice?.cost! || productSelected?.cost!,
                    product: productSelected?._id!,
                    price: productPrice?.price! || productSelected?.price!,
                    storage: storageSelected,
                    cost: productPrice?.cost! || productSelected?.cost!,
                    color: colorSelected,
                    quantity: 1,
                },
            })
        );
        message.success("Thêm vào giỏ hàng thành công");
    };

    return (
        <>
            {!isLoading && (
                <div className="ms-card ms-product__details-page">
                    <div className="ms-wrapper">
                        <Breadcrumbs
                            data={[
                                { title: productSelected?.category.name, url: `/${categoryAscii}` },
                                { title: productSelected?.name, url: `/${categoryAscii}/${productAscii}` },
                            ]}
                        />
                        <div className="ms-product__details-top">
                            <h1 className="ms-product__details-top-name">
                                {productSelected?.name}
                                <span className="st-sku">(No.{productSelected?.sku})</span>
                            </h1>
                        </div>
                        <div className="ms-product__details">
                            <ProductThumb images={productSelected?.images} />
                            <div className="ms-product__details-content">
                                <div className="ms-product__details-content-price">
                                    {productSelected?.variants.length !== 0 ? (
                                        <>
                                            {productPrice?.cost === undefined || productPrice?.cost === null ? (
                                                <>
                                                    <div className="st-price-main">
                                                        <span>{Number(productPrice?.price).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="st-price-main">
                                                        <span>{Number(productPrice?.cost).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                                    </div>
                                                    <div className="st-price-sub">
                                                        <span>{Number(productPrice?.price).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {productSelected?.cost === undefined || productSelected?.cost === null ? (
                                                <>
                                                    <div className="st-price-main">
                                                        <span>{Number(productSelected?.price).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="st-price-main">
                                                        <span>{Number(productSelected?.cost).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                                    </div>
                                                    <div className="st-price-sub">
                                                        <span>{Number(productSelected?.price).toLocaleString("it-IT", { style: "currency", currency: "VND" })}</span>
                                                    </div>
                                                </>
                                            )}
                                        </>
                                    )}
                                </div>
                                {productSelected?.variants.length !== 0 && (
                                    <>
                                        <strong style={{ marginTop: 10, display: "block" }}>Bộ nhớ:</strong>
                                        <div className="st-select">
                                            {productSelected?.variants.map((variant, index) => (
                                                <Link
                                                    to={`/${categoryAscii}/${productAscii}?dung-luong=${variant.storage.nameAscii}`}
                                                    className="st-select__item"
                                                    key={index}
                                                >
                                                    <div className="radio">
                                                        <div>
                                                            <Radio checked={storageSelected === variant.storage.nameAscii && true}>{variant.storage.name}</Radio>
                                                        </div>
                                                        <p>
                                                            {variant.cost === undefined || variant.cost === null
                                                                ? Number(variant.price).toLocaleString("it-IT", { style: "currency", currency: "VND" })
                                                                : Number(variant.cost).toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        <strong style={{ marginTop: 10, display: "block" }}>Màu sắc:</strong>
                                        <div className="st-select-color">
                                            {productColor?.map((item, index) => (
                                                <div
                                                    className={`st-select-color-item${item.color._id === colorSelected ? " active" : ""}`}
                                                    onClick={() => setColorSelected(item.color._id)}
                                                    key={index}
                                                >
                                                    <div className="st-select-color-img">
                                                        <div className="st-select-color-text">{item.color.name}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <div style={{ marginTop: 16 }}>
                                    <strong style={{ marginBottom: 10, display: "block" }}>Mô tả:</strong>
                                    <p>{productSelected?.description}</p>
                                </div>
                                <div className="ms-product__details-content-button">
                                    <Button type="primary" onClick={addToCartHandle}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                    {/* <Button className="buy-now">Mua ngay</Button> */}
                                </div>

                                {productSelected?.configurations.length !== 0 && (
                                    <div style={{ marginTop: 16 }}>
                                        <strong style={{ marginBottom: 10, display: "block" }}>Cấu hình:</strong>
                                        <table className="ms-product__details-configuration">
                                            <thead></thead>
                                            <tbody>
                                                {productSelected?.configurations.map((item) => (
                                                    <tr key={item.configuration._id}>
                                                        <td>
                                                            <strong>{item.configuration.name}</strong>
                                                        </td>
                                                        <td>{item.specName}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!isLoadingRelated && productRelated?.length !== 0 && (
                <div className="ms-wrapper">
                    <ProductSlide title="Sản phẩm cùng danh mục" data={productRelated} />
                </div>
            )}
        </>
    );
};

export default ProductDetail;
