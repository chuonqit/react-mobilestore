import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs } from "swiper";
import { Link } from "react-router-dom";
import { SliderType } from "../types/sliders.type";

interface HomeBannerProps {
    data?: SliderType[];
    loading?: boolean;
}

const HomeBanner = ({ data, loading = false }: HomeBannerProps) => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>();

    return (
        <div className="ms-card">
            {!loading ? (
                <div className="ms-box-top">
                    <div className="ms-banner">
                        <Swiper spaceBetween={10} navigation={true} thumbs={{ swiper: thumbsSwiper }} modules={[Navigation, Thumbs]} className="ms-banner__main">
                            {data?.map((slider) => (
                                <SwiperSlide className="ms-banner__main-item swiper-slide-active" key={slider._id}>
                                    <a href={slider.url} target="_blank">
                                        <img src={slider.image} />
                                    </a>
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
                            className="ms-banner__button"
                        >
                            {data?.map((slider) => (
                                <SwiperSlide className="ms-banner__button-item swiper-slide-active" key={slider._id}>
                                    <div className="ms-banner__button-item-text">{slider.title}</div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="ms-ads">
                        <div className="ms-ads-item">
                            <Link to="" target="_blank">
                                <img src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/4/1/637844358639040912_F-H2_385x100.png" />
                            </Link>
                        </div>
                        <div className="ms-ads-item">
                            <Link to="" target="_blank">
                                <img src="https://images.fpt.shop/unsafe/fit-in/385x100/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2022/4/1/637843732204253227_F-H2_385x100@2x.png" />
                            </Link>
                        </div>
                        <div className="ms-news-item">
                            <div className="ms-news-item-body">
                                <div className="ms-news-item-body-caption">
                                    <h3>Thông tin nổi bật</h3>
                                    <Link to="">Xem tất cả</Link>
                                </div>
                                <article className="ms-news-item-content mb-10">
                                    <Link to="" className="ms-news-item-content-item">
                                        <span className="picture">
                                            <img src="https://images.fpt.shop/unsafe/fit-in/70x40/filters:quality(90):fill(white)/https://fptshop.com.vn/Uploads/images/2015/PhuongMT5/4(2).png" />
                                        </span>
                                        <div className="ms-news-item-if">
                                            <span>
                                                Sắm Tab S8 Series ưu đãi đến 4.5 triệu Sắm Tab S8 Series ưu đãi đến 4.5 triệu Sắm Tab S8 Series ưu đãi đến 4.5 triệu
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                                <article className="ms-news-item-content">
                                    <Link to="" className="ms-news-item-content-item">
                                        <span className="picture">
                                            <img src="https://images.fpt.shop/unsafe/fit-in/70x40/filters:quality(90):fill(white)/https://fptshop.com.vn/Uploads/images/2015/PhuongMT5/4(2).png" />
                                        </span>
                                        <div className="ms-news-item-if">
                                            <span>
                                                Sắm Tab S8 Series ưu đãi đến 4.5 triệu Sắm Tab S8 Series ưu đãi đến 4.5 triệu Sắm Tab S8 Series ưu đãi đến 4.5 triệu
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default HomeBanner;
