import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs } from "swiper";
import { ProductImageType } from "../types/products.type";

interface ProductThumbProps {
    images?: ProductImageType[];
}

const ProductThumb = ({ images }: ProductThumbProps) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>();

    return (
        <div className="ms-product__details-thumb">
            <Swiper spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} modules={[Navigation, Thumbs]} className="ms-product__details-thumb__main">
                {images?.map((image, index) => (
                    <SwiperSlide className="ms-product__details-thumb__main-item" key={index}>
                        <img src={image.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="ms-product__details-thumb__button"
            >
                {images?.map((image, index) => (
                    <SwiperSlide className="ms-product__details-thumb__button-item" key={index}>
                        <img src={image.url} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ProductThumb;
