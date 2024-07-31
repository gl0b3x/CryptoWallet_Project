import classes from "./CryptoDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FormatPrice from "../Tools/FormatPrice.jsx";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import Api from "../Api/Api.js";
import SkeletonLoading from "../Tools/SkeletonLoading.jsx";
import LoadingAnimation from "../Tools/LoadingAnimation.jsx";
import { CryptoContext } from "../../Context/ConfigProvider.jsx";
import NumberFormatter from "../Tools/NumberFormatter.jsx";

const highlightLinePlugin = {
  id: "highlightLinePlugin",
  afterDatasetsDraw(chart) {
    const { ctx, tooltip, chartArea } = chart;
    if (!tooltip || !tooltip.body || tooltip.body.length === 0) {
      return;
    }
    const { caretX } = tooltip;
    ctx.save();
    ctx.strokeStyle = "rgb(138, 43, 226, 0.8)";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(caretX, chartArea.top);
    ctx.lineTo(caretX, chartArea.bottom);
    ctx.stroke();
    ctx.restore();
  },
};

const highlightPlugin = {
  id: "highlightPlugin",
  afterDatasetsDraw(chart) {
    const { ctx, tooltip } = chart;
    if (!tooltip || !tooltip.body || tooltip.body.length === 0) {
      return;
    }
    const { caretX, caretY } = tooltip;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(caretX, caretY, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(138, 43, 226)";
    ctx.beginPath();
    ctx.arc(caretX, caretY, 8, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  },
};

const highlightPlusPlugin = {
  id: "highlightPlusPlugin",
  afterDatasetsDraw(chart) {
    const { ctx, tooltip, chartArea } = chart;
    if (!tooltip || !tooltip.body || tooltip.body.length === 0) {
      return;
    }
    const { caretX } = tooltip;
    const { top, bottom, left, right } = chartArea;
    const meta = chart.getDatasetMeta(0);
    const dataPoints = meta.data;
    ctx.save();
    const isLightTheme =
      chart.options.plugins.highlightPlusPlugin.theme === "light";
    const highlightColor = isLightTheme
      ? "rgba(129, 40, 226, 0.1)"
      : "rgba(138, 43, 226, 0.1)";
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();
    ctx.fillStyle = highlightColor;
    ctx.beginPath();
    ctx.moveTo(left, bottom);
    dataPoints.forEach((point, index) => {
      if (point.x <= caretX) {
        if (index === 0 || dataPoints[index - 1].x > caretX) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
    });
    ctx.lineTo(caretX, bottom);
    ctx.lineTo(left, bottom);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.beginPath();
    ctx.moveTo(left, top);
    dataPoints.forEach((point, index) => {
      if (point.x <= caretX) {
        if (index === 0 || dataPoints[index - 1].x > caretX) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      }
    });
    ctx.lineTo(caretX, top);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  highlightLinePlugin,
  highlightPlugin,
  highlightPlusPlugin,
);

const CryptoDetails = () => {
  const params = useParams();
  const [period, setPeriod] = useState("24h");
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState();
  const [currencyCharts, setCurrencyCharts] = useState([]);
  const [chartData, setChartData] = useState(null);
  const { currentTheme } = useContext(CryptoContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [chartResponse, dataResponse] = await Promise.all([
          Api.getCryptoChart(params.symbol, period),
          Api.getCryptoById(params.symbol),
        ]);
        setCurrencyCharts(chartResponse.data);
        setCurrency(dataResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.symbol, period]);

  useEffect(() => {
    if (currencyCharts.length > 0) {
      const data = currencyCharts.map((entry) => ({
        time: entry[0] * 1000,
        price: entry[1],
      }));

      const labels = data.map((entry) => new Date(entry.time).toString());
      const prices = data.map((entry) => entry.price);

      setChartData({
        labels,
        datasets: [
          {
            label: "Price",
            data: prices,
            borderColor: "rgba(175, 107, 243, 1)",
            pointStyle: false,
          },
        ],
      });
    }
  }, [currencyCharts, period]);

  const chartOptions = {
    responsive: true,
    plugins: {
      highlightPlusPlugin: {
        theme: currentTheme,
      },
      legend: {
        display: false,
      },
      tooltip: {
        caretPadding: 16,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(0, 0, 0, 1)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderWidth: 0,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        callbacks: {
          title: function (tooltipItems) {
            const date = new Date(tooltipItems[0].label);
            return date.toLocaleString();
          },
          label: function (tooltipItem) {
            if (tooltipItem.raw < 0.001) {
              return `USD price: $ ${tooltipItem.raw.toFixed(8)}`;
            } else {
              return `USD price: ${new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(tooltipItem.raw)}`;
            }
          },
        },
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 16,
          },
          callback: function (value, index, ticks) {
            if (chartData && chartData.labels) {
              const date = new Date(chartData.labels[value]);
              return period === "24h" && ticks.length > 10
                ? date.toLocaleTimeString().slice(0, 5)
                : date.toLocaleDateString();
            }
            return "";
          },
          maxTicksLimit: 10,
          autoSkip: true,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        ticks: {
          maxTicksLimit: 9,
          autoSkip: true,
          font: {
            size: 16,
          },
          callback: function (value) {
            if (value < 0.001) {
              return value.toFixed(8);
            } else {
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value);
            }
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <main className={classes.detailsWrapper}>
      {loading ? (
        <div className={classes.generalInfo}>
          <SkeletonLoading style={{ width: "30%", height: "125px" }} />
        </div>
      ) : (
        <div className={classes.generalInfo}>
          <div className={classes.leftBlock}>
            <div className={classes.imageWrapper}>
              <img
                className={classes.iconCurrency}
                src={currency.icon}
                alt={"Icon"}
              />
              <span className={classes.rankCurrency}># {currency.rank}</span>
            </div>
          </div>
          <div className={classes.rightBlock}>
            <div className={classes.flexBox}>
              <span className={classes.nameCurrency}> {currency.name}</span>
              <span className={classes.symbolCurrency}> {currency.symbol}</span>
            </div>
            <div className={classes.flexBox}>
              <span className={classes.priceCurrency}>
                $ <FormatPrice price={currency.price} />
              </span>
              <span
                className={`${classes.coinChange} ${
                  currency.priceChange1d > 0 ? classes.up : classes.down
                }`}
              >
                {currency.priceChange1d > 0
                  ? "+" + currency.priceChange1d
                  : currency.priceChange1d}
                %
              </span>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <span className={classes.Article}>Price Charts</span>
      ) : (
        <span className={classes.Article}>
          {currency.name} Price Charts ({currency.symbol})
        </span>
      )}
      <div className={classes.chartInfo}>
        <div className={classes.groupTime}>
          <span
            className={period === "24h" ? classes.active : classes.notActive}
            onClick={() => setPeriod("24h")}
          >
            24H
          </span>
          <span
            className={period === "1w" ? classes.active : classes.notActive}
            onClick={() => setPeriod("1w")}
          >
            1W
          </span>
          <span
            className={period === "1m" ? classes.active : classes.notActive}
            onClick={() => setPeriod("1m")}
          >
            1M
          </span>
          <span
            className={period === "3m" ? classes.active : classes.notActive}
            onClick={() => setPeriod("3m")}
          >
            3M
          </span>
          <span
            className={period === "6m" ? classes.active : classes.notActive}
            onClick={() => setPeriod("6m")}
          >
            6M
          </span>
          <span
            className={period === "1y" ? classes.active : classes.notActive}
            onClick={() => setPeriod("1y")}
          >
            1Y
          </span>
          <span
            className={period === "all" ? classes.active : classes.notActive}
            onClick={() => setPeriod("all")}
          >
            ALL
          </span>
        </div>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "65vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingAnimation />
          </div>
        ) : (
          chartData && <Line data={chartData} options={chartOptions} />
        )}
      </div>

      <span className={classes.Article}>Market Stats</span>
      <div className={classes.marketStats}>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Market Cap</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span className={classes.textStats}>
              $<NumberFormatter number={currency.marketCap} />
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Fully Diluted Valuation</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span className={classes.textStats}>
              $<NumberFormatter number={currency.fullyDilutedValuation} />
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Circulating Supply</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span className={classes.textStats}>
              <NumberFormatter number={currency.availableSupply} />
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Total Supply</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span className={classes.textStats}>
              <NumberFormatter number={currency.totalSupply} />
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Volume 24h</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span className={classes.textStats}>
              $<NumberFormatter number={currency.volume} />
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Price Change (1h)</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span
              className={`${classes.textStats} ${
                currency.priceChange1h > 0 ? classes.up : classes.down
              }`}
            >
              {currency.priceChange1h > 0
                ? "+" + currency.priceChange1h
                : currency.priceChange1h}
              %
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Price Change (24h)</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span
              className={`${classes.textStats} ${
                currency.priceChange1d > 0 ? classes.up : classes.down
              }`}
            >
              {currency.priceChange1d > 0
                ? "+" + currency.priceChange1d
                : currency.priceChange1d}
              %
            </span>
          )}
        </div>
        <div className={classes.blockStats}>
          <span className={classes.articleStats}>Price Change (7d)</span>
          {loading ? (
            <SkeletonLoading style={{ width: "50%", height: "30px " }} />
          ) : (
            <span
              className={`${classes.textStats} ${
                currency.priceChange1w > 0 ? classes.up : classes.down
              }`}
            >
              {currency.priceChange1w > 0
                ? "+" + currency.priceChange1w
                : currency.priceChange1w}
              %
            </span>
          )}
        </div>
      </div>
    </main>
  );
};

export default CryptoDetails;
