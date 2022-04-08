import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdLocalFireDepartment } from "react-icons/md";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Grid, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import { SwiperModule } from "swiper/types";
import { ProductType } from "../types/products.type";

interface ProductSlideProps {
    promotion?: boolean;
    title: string;
    rows?: number;
    slider?: boolean;
    viewMore?: string;
    data?: ProductType[];
    loading?: boolean;
}

const ProductSlide = ({ promotion = false, title, rows = 1, slider = true, viewMore, data, loading = false }: ProductSlideProps) => {
    const [modules, setModules] = React.useState<SwiperModule[]>([Pagination, Navigation]);

    React.useEffect(() => {
        if (!slider) {
            setModules([...modules, Grid]);
        }
    }, [rows]);

    return (
        <div className="ms-card ms-product__slide">
            {!loading ? (
                <>
                    <div className="ms-product__slide-main-title">
                        <div className={`ms-product__slide-title${promotion ? " promotion" : ""}`}>
                            {promotion && <MdLocalFireDepartment />}
                            <span>{title}</span>
                        </div>
                        {viewMore && <Link to={viewMore}>Xem tất cả</Link>}
                    </div>
                    <Swiper
                        slidesPerView={4}
                        navigation={slider}
                        cssMode={!slider}
                        grid={{
                            rows: slider ? 1 : rows,
                        }}
                        modules={modules}
                        className="ms-product__slide-main"
                    >
                        {data?.map((product) => (
                            <SwiperSlide key={product._id}>
                                <div className="ms-product__slide-item">
                                    <Link to={`/${product.category.nameAscii}/${product.nameAscii}`}>
                                        <div className={`ms-product__slide-item-img${product.cost !== undefined || product.cost > 0 ? " promotion" : ""}`}>
                                            <img src={product.images[0].url} />
                                            <div className="ms-product__slide-item-label">
                                                <span className="badge badge-primary">
                                                    Giảm {(product.price - product.cost).toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="ms-product__slide-item-info">
                                        <h3>
                                            <Link to={`/${product.category.nameAscii}/${product.nameAscii}`}>{product.name}</Link>
                                        </h3>
                                        <div className="ms-product__slide-item-promo">
                                            {product.cost === undefined || product.cost === 0 ? (
                                                <>
                                                    <div className="ms-product__slide-item-price">
                                                        {product.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="ms-product__slide-item-progress">
                                                        {product.cost.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                        <div
                                                            className="ms-product__slide-item-progress-bar"
                                                            style={{ width: `${100 - ((product.price - product.cost) / product.price) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="ms-product__slide-item-strike-price">
                                                        {product.price.toLocaleString("it-IT", { style: "currency", currency: "VND" })}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            ) : null}
        </div>
    );
};

export default ProductSlide;
