import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import storeApi from "../services/storeApi.service";

import "./Product/product.scss";

const Search = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [searchProduct, { data, isLoading }] = storeApi.useLazySearchProductQuery();

    React.useEffect(() => {
        if (searchParam.get("p") === null || searchParam.get("p") === "") {
            navigate("/", { replace: true });
        } else {
            searchProduct(searchParam.get("p"));
        }
    }, [searchParam]);

    return (
        <div className="ms-wrapper">
            {!isLoading ? (
                <div className="ms-product__category-content" style={{ width: "100%" }}>
                    <div className="ms-card">
                        <div className="ms-card-head">
                            <div className="ms-card-title">
                                Tìm thấy {data?.length} kết quả với từ khóa "{searchParam.get("p")}"
                            </div>
                        </div>
                    </div>
                    <div className="ms-card">
                        <div className="ms-product">
                            {data?.map((product) => (
                                <div className="ms-product-item" key={product._id}>
                                    <div className={`ms-product-item-img${product.cost !== undefined || product.cost > 0 ? " promotion" : ""}`}>
                                        <Link to={`/${product.category.nameAscii}/${product.nameAscii}`}>
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
                                            <Link to={`/${product.category.nameAscii}/${product.nameAscii}`}>Tai nghe không dây Mi TWS Earphones 2 Basic</Link>
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
                                            <Link className="ms-product-item-button-buy" to={`/${product.category.nameAscii}/${product.nameAscii}`}>
                                                Mua ngay
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Search;
