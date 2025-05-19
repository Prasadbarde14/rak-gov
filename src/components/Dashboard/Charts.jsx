import { CircleAlert, OctagonAlert, TrendingDown, TrendingUp } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";

const Skeleton = () => {
    return (
        <div className=" w-1/4 h-full max-w-sm rounded-md border border-gray-300 p-2">
            <div className="flex animate-pulse w-full h-full flex-col items-start gap-2 ">
                <div className="flex w-full  items-center gap-2">
                    <div className="h-2 rounded w-full bg-gray-300"></div>
                    <div className="size-10 rounded-full bg-gray-300"></div>
                </div>
                <div className="h-5 rounded w-1/4 bg-gray-300"></div>
                <div className="h-2 rounded w-full bg-gray-300"></div>
                <div className="h-8 rounded w-full bg-gray-300"></div>
                <div className="h-5 rounded w-1/4 bg-gray-300"></div>
            </div>
        </div>
    );
};

const TransparentLineChart = ({ data, color }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chartInstance = echarts.init(chartRef.current);
        const option = {
            xAxis: {
                type: "category",
                boundaryGap: false,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
            },
            yAxis: {
                type: "value",
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { show: false },
                splitLine: { show: false },
            },
            series: [
                {
                    data: data.values,
                    type: "line",
                    smooth: true,
                    lineStyle: {
                        color: color,
                        width: 2,
                        opacity: 1,
                    },
                    symbol: "none",
                    animationDuration: 5000,
                    animationEasing: "cubicOut",
                },

            ],
            grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
            tooltip: { show: false },
            backgroundColor: "transparent",
        };

        chartInstance.setOption(option);

        return () => {
            chartInstance.dispose();
        };
    }, [data]);

    return (
        <div
            ref={chartRef}
            style={{
                width: "100%",
                height: "30px",
                background: "transparent",
                overflow: "hidden",
            }}
        />
    );
};

const ProgressBar = ({ currentValue, totalValue }) => {
    const percentage = Math.min((currentValue / totalValue) * 100, 100);
    // const [loading,setLoading]=useState()
    // useEffect({

    // },[percentage])

    return (
        <>
            <div className="w-full bg-gray-200 rounded-xl h-2 overflow-hidden">
                <div
                    className="h-full bg-[#eab308] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <p className="mt-2 text-gray-700">{percentage.toFixed(2)}%</p>
        </>
    );
};

const Card = (data) => {
    return (
        <div className="w-1/4 h-full max-w-sm rounded-md border border-gray-300 p-4 overflow-x-auto bg-white shadow-sm">
            <div className="flex w-full h-full flex-col items-start">
                <div className="flex w-full gap-2 items-center justify-center">
                    <div className="w-full text-[#64748b] text-sm">{data.data.name}</div>
                    {data.data.status === "Needs attention" ? (
                        <TrendingDown color="#ef4444" />
                    ) : (
                        <TrendingUp color="#22c55e" />
                    )}
                </div>
                <div className="flex items-end gap-2 justify-center">
                    <div className="text-2xl font-semibold ">{data.data.value}</div>
                    <div className="text-[#64748b]">{data.data.unit}</div>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm text-[#64748b] ">
                        <div className="text-[#64748b] text-xs">Progress</div>
                        <div>
                            {Math.min((data.data.progress / data.data.total) * 100, 100)}%
                        </div>
                    </div>
                    <ProgressBar
                        currentValue={data.data.progress}
                        totalValue={data.data.total}
                    />
                </div>
                <TransparentLineChart
                    data={data.data.trendData}
                    color={data.data.status === "Needs attention" ? "#ef4444" : "#22c55e"}
                />
                <div className="flex w-full gap-2 items-center justify-between">
                    <div className="text-sm text-[#64748b]">
                        Target:
                        {data.data.value + " "}
                        {data.data.unit}
                    </div>
                    {data.data.status == "Needs attention" && (
                        <div className="flex text-xs justify-center items-center gap-1 text-orange-700/75">
                            <CircleAlert size={14} color="#D97707" /> {data.data.status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

function Charts({ graphData }) {
    const { data, isLoading, isError } = graphData;

    return (
        <div className="h-full">
            {isLoading && (
                <div className="flex gap-2 w-full h-full justify-between items-center">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            )}

            {isError && <div></div>}

            <div className="flex w-full h-full justify-start items-center gap-2">
                {!isLoading &&
                    !isError &&
                    data?.map((i, indx) => <Card data={i} key={indx} />)}
            </div>
        </div>
    );
}

export default Charts;
