import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "../../stores/hooks";
import { createSelector } from "reselect";
import { ProductType } from "../../types/products.type";
ChartJS.register(...registerables);

const selectProducts = (state: any) => state.products;

const totalProduct = createSelector([selectProducts], (products) => {
    return { data: products, total: products?.length };
});

interface DashboardProps {}

const Dashboard = (props: DashboardProps) => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    const states = useAppSelector((state) => state);

    const { total, data } = totalProduct(states.products);

    const makeBold = (item: string, keyword: string) => {
        var re = new RegExp(keyword, "g");
        return item.replace(re, "<strong>" + keyword + "</strong>");
    };

    return (
        <>
            <span
                dangerouslySetInnerHTML={{
                    __html: makeBold("chu nguyen chuong", "chu"),
                }}
            />
            <Line
                data={{
                    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
                    datasets: [
                        {
                            label: "2021",
                            data: [1, 5, 2, 4, 2, 3, 3, 4, 5, 4, 7, 2],
                            borderColor: `rgb(${r},${g},${b})`,
                        },
                        {
                            label: "2022",
                            data: [2, 3, 1, 3, 4, 5, 6, 4, 7, 9, 3, 2],
                            borderColor: `rgb(${r},${g},${b})`,
                        },
                    ],
                }}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Tổng kết số đơn hàng bán được theo năm",
                        },
                    },
                }}
            />
        </>
    );
};

export default Dashboard;
