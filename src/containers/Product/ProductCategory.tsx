import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdViewList, MdViewModule } from "react-icons/md";

import "./product.scss";
import Breadcrumbs from "../../components/Breadcrumbs";
import storeApi from "../../services/storeApi.service";
import { ProductType } from "../../types/products.type";

const prices = [
    {
        name: "Dưới 2 triệu",
        nameAscii: "duoi-2-trieu",
    },
    {
        name: "Từ 2 - 4 triệu",
        nameAscii: "tu-2-4-trieu",
    },
    {
        name: "Từ 4 - 7 triệu",
        nameAscii: "tu-4-7-trieu",
    },
    {
        name: "Từ 7 - 13 triệu",
        nameAscii: "tu-7-13-trieu",
    },
    {
        name: "Trên 13 triệu",
        nameAscii: "tren-13-trieu",
    },
];

interface ProductCategoryProps {}

const ProductCategory = (props: ProductCategoryProps) => {
    const navigate = useNavigate();
    const { categoryAscii } = useParams<{ categoryAscii: string }>();
    const [searchBrands, setSearchBrands] = React.useState<string>("");
    const [searchPrices, setSearchPrices] = React.useState<string>("");
    const [searchStorages, setSearchStorages] = React.useState<string>("");
    const [productStyleList, setProductStyleList] = React.useState<boolean>(false);
    const [productCategory, setProductCategory] = React.useState<ProductType[]>();
    const { data: categoryData, isLoading } = storeApi.useFetchCategoryProductSelectedQuery(categoryAscii);
    const [filterProductsCategory] = storeApi.useFilterProductsCategoryMutation();

    React.useEffect(() => {
        if (!isLoading && categoryData === undefined) {
            navigate("/", { replace: true });
        }
        if (searchBrands || searchPrices || searchStorages) {
            filterProductsCategory({ categoryId: categoryData?.category._id, brands: searchBrands, prices: searchPrices, storages: searchStorages }).then(
                (response: any) => {
                    setProductCategory(response.data);
                }
            );
        } else {
            setProductCategory(categoryData?.products);
        }
    }, [categoryData, searchBrands, searchStorages, searchPrices, isLoading]);

    const filterSearchBrands = (value: string) => {
        setSearchBrands(value);
    };

    const filterSearchPrices = (value: string) => {
        setSearchPrices(value);
    };

    const filterSearchStorages = (value: string) => {
        setSearchStorages(value);
    };

    return !isLoading ? (
        <div className="ms-wrapper">
            <Breadcrumbs data={[{ title: categoryData?.category.name, url: `/${categoryAscii}` }]} />
            <div className="ms-product__category">
                <div className="ms-product__category-filter">
                    <div className="ms-product__filter-box">
                        <div className="ms-product__filter-title">Hãng sản xuất</div>
                        <div className="ms-product__filter-checklist filter-brand">
                            <div className={`ms-product__filter-checkbox${searchBrands === "" ? " active" : ""}`} onClick={() => setSearchBrands("")}>
                                <a>
                                    <i className="iconcate-checkbox"></i>Tất cả
                                </a>
                            </div>
                            {categoryData?.brands.map((brand) => (
                                <div
                                    key={brand._id}
                                    className={`ms-product__filter-checkbox${searchBrands === brand._id ? " active" : ""}`}
                                    onClick={() => filterSearchBrands(brand._id)}
                                >
                                    <a>
                                        <i className="iconcate-checkbox"></i>
                                        {brand.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ms-product__filter-box">
                        <div className="ms-product__filter-title">Mức giá</div>
                        <div className="ms-product__filter-checklist">
                            <div className={`ms-product__filter-checkbox${searchPrices === "" ? " active" : ""}`} onClick={() => setSearchPrices("")}>
                                <a>
                                    <i className="iconcate-checkbox"></i>Tất cả
                                </a>
                            </div>
                            {prices.map((price) => (
                                <div
                                    key={price.nameAscii}
                                    className={`ms-product__filter-checkbox${searchPrices === price.nameAscii ? " active" : ""}`}
                                    onClick={() => filterSearchPrices(price.nameAscii)}
                                >
                                    <a>
                                        <i className="iconcate-checkbox"></i>
                                        {price.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="ms-product__filter-box">
                        <div className="ms-product__filter-title">Dung lượng PIN</div>
                        <div className="ms-product__filter-checklist">
                            <div className={`ms-product__filter-checkbox${searchStorages === "" ? " active" : ""}`} onClick={() => setSearchStorages("")}>
                                <a>
                                    <i className="iconcate-checkbox"></i>Tất cả
                                </a>
                            </div>
                            {categoryData?.storages.map((storage) => (
                                <div
                                    key={storage._id}
                                    className={`ms-product__filter-checkbox${searchStorages === storage._id ? " active" : ""}`}
                                    onClick={() => filterSearchStorages(storage._id)}
                                >
                                    <a>
                                        <i className="iconcate-checkbox"></i>
                                        {storage.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ms-product__category-content">
                    <div className="ms-card">
                        <div className="ms-card-head">
                            <div className="ms-card-title">
                                {categoryData?.category.name}{" "}
                                <small style={{ fontSize: 14, textTransform: "lowercase" }}>({categoryData?.products.length} sản phẩm)</small>
                            </div>
                        </div>
                    </div>
                    <div className="ms-card">
                        <div className="ms-product-low-filter">
                            <div className="col-right">
                                <MdViewList onClick={() => setProductStyleList(true)} className={productStyleList ? "active" : ""} />
                                <MdViewModule onClick={() => setProductStyleList(false)} className={productStyleList ? "" : "active"} />
                            </div>
                        </div>
                        <div className={`ms-product${productStyleList ? " list" : ""}`}>
                            {productCategory?.map((product) => (
                                <div className="ms-product-item" key={product._id}>
                                    <div className={`ms-product-item-img${product.cost !== undefined || product.cost > 0 ? " promotion" : ""}`}>
                                        <Link to={`/${categoryAscii}/${product.nameAscii}`}>
                                            <img src={product.images[0].url} />
                                        </Link>
                                        <div className="ms-product-item-label">
                                            <span className="badge badge-primary">
                                                Giảm {(product.price - product.cost).toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ms-product-item-info">
                                        <h3>
                                            <Link to={`/${categoryAscii}/${product.nameAscii}`}>Tai nghe không dây Mi TWS Earphones 2 Basic</Link>
                                        </h3>
                                        <div className="ms-product-item-promo">
                                            {product.cost === undefined || product.cost === 0 ? (
                                                <>
                                                    <div className="ms-product-item-price">
                                                        {product.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="ms-product-item-progress">
                                                        {product.cost.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                        <div
                                                            className="ms-product-item-progress-bar"
                                                            style={{ width: `${100 - ((product.price - product.cost) / product.price) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="ms-product-item-strike-price">
                                                        {product.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="ms-product-item-button">
                                            <Link className="ms-product-item-button-buy" to={`/${categoryAscii}/${product.nameAscii}`}>
                                                Mua ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default ProductCategory;
