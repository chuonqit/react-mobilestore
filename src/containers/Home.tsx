import React from "react";
import HomeBanner from "../components/HomeBanner";
import HomeCategories from "../components/HomeCategories";
import ProductSlide from "../components/ProductSlide";
import storeApi from "../services/storeApi.service";

interface HomeProps {}

const Home = (props: HomeProps) => {
    const { data: homeData, isLoading } = storeApi.useFetchHomeDataListQuery();

    return (
        <div className="ms-wrapper">
            <HomeBanner data={homeData?.sliders} loading={isLoading} />
            <HomeCategories data={homeData?.categories} />
            <ProductSlide title="SẢN PHẨM NỔI BẬT" promotion={true} data={homeData?.productFeatured} loading={isLoading} />
            {homeData?.categories?.map((category) => {
                if (homeData?.bestSellerData[category._id]) {
                    return (
                        <ProductSlide
                            title={`${homeData?.bestSellerData[category._id][0].category.name} bán chạy`}
                            viewMore={`${homeData?.bestSellerData[category._id][0].category.nameAscii}`}
                            slider={false}
                            data={homeData?.bestSellerData[category._id]}
                            rows={2}
                            key={category._id}
                            loading={isLoading}
                        />
                    );
                }
            })}
        </div>
    );
};

export default Home;
