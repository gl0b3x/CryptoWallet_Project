import classes from "./CryptoDetails.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import FormatPrice from "../Tools/FormatPrice.jsx";
import Api from "../Api/Api.js";
import SkeletonLoading from "../Tools/SkeletonLoading.jsx";
import LoadingAnimation from "../Tools/LoadingAnimation.jsx";
import { CryptoContext } from "../../Context/ConfigProvider.jsx";
import NumberFormatter from "../Tools/NumberFormatter.jsx";
import { ColorType, createChart } from "lightweight-charts";
import FormatPriceFunct from "../Tools/FormatPriceFunct.js";

const CryptoDetails = () => {
  const params = useParams();
  const [period, setPeriod] = useState("24h");
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [currency, setCurrency] = useState({});
  const { currentTheme } = useContext(CryptoContext);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataResponse = await Api.getCryptoById(params.symbol);

        setCurrency(dataResponse.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.symbol]);

  useEffect(() => {
    const fetchChart = async () => {
      setLoadingChart(true);
      setInitialData([]);
      try {
        const chartResponse = await Api.getCryptoChart(params.symbol, period);

        if (chartResponse.data.length > 0) {
          setInitialData(
            chartResponse.data.map((entry) => ({
              time: entry[0],
              value: entry[1],
            })),
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChart();
  }, [period]);

  const {
    colors: {
      backgroundColor = "transparent",
      lineColor = currentTheme === "dark"
        ? "rgb(184, 155, 228)"
        : "rgb(175, 107, 243)",
      textColor = currentTheme === "dark" ? "rgb(255,255,255)" : "rgb(0,0,0)",
      areaTopColor = currentTheme === "dark"
        ? "rgb(138, 43, 226)"
        : "rgb(129, 40, 226)",
      areaBottomColor = currentTheme === "dark"
        ? "rgb(6, 17, 33)"
        : "rgb(255, 255, 255)",
    } = {},
  } = {};

  const chartContainerRef = useRef();

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) return;

    const chartOptions = {
      layout: {
        textColor,
        background: { type: ColorType.Solid, color: backgroundColor },
      },
      rightPriceScale: {
        visible: true,
        borderVisible: false,
      },
      localization: {
        locale: "en-US",
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
      crosshair: {
        horzLine: {
          visible: true,
          style: 0,
          width: 2,
          color: "rgba(32, 38, 46, 1)",
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          style: 0,
          width: 2,
          color: "rgba(32, 38, 46, 1)",
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    };

    const chart = createChart(container, chartOptions);

    const newSeries = chart.addAreaSeries({
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      lineColor,
      lineWidth: 2,
      crossHairMarkerVisible: false,
      priceLineVisible: false,
      lastValueVisible: false,
    });

    newSeries.setData(initialData);

    const toolTipWidth = 150;
    const toolTip = document.createElement("div");
    toolTip.classList.add("tooltip-Chart");
    container.appendChild(toolTip);

    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth });
    };

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        toolTip.style.display = "block";
        const data = param.seriesData.get(newSeries);
        toolTip.innerHTML = `
          <div style="color: ${lineColor}"> ${params.symbol}</div>
          <div style="color: ${textColor}" class="tooltip-Chart-price">
            ${FormatPriceFunct(data.value !== undefined ? data.value : data.close)} $
          </div>
          <div style="color: ${textColor}">  
            ${new Date(param.time * 1000).toLocaleDateString()}
          </div>`;

        let left = param.point.x;
        const timeScaleWidth = chart.timeScale().width();
        const priceScaleWidth = chart.priceScale("left").width();
        const halfTooltipWidth = toolTipWidth / 2;
        left += priceScaleWidth - halfTooltipWidth;
        left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
        left = Math.max(left, priceScaleWidth);

        toolTip.style.left = left + "px";
        toolTip.style.top = 0 + "px";
      }
    });

    chart.timeScale().fitContent();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      toolTip.remove();
    };
  }, [
    initialData,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <main className={classes.detailsWrapper}>
      {loading ? (
        <div className={classes.generalInfo}>
          <SkeletonLoading style={{ width: "100%", height: "125px" }} />
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
          {["24h", "1w", "1m", "3m", "6m", "1y", "all"].map((periodOption) => (
            <span
              key={periodOption}
              className={
                period === periodOption ? classes.active : classes.notActive
              }
              onClick={() => setPeriod(periodOption)}
            >
              {periodOption}
            </span>
          ))}
        </div>
        {loadingChart ? (
          <div
            style={{
              width: "100%",
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingAnimation />
          </div>
        ) : (
          <div ref={chartContainerRef} className={classes.chart} />
        )}
      </div>

      <span className={classes.Article}>Market Stats</span>
      <div className={classes.marketStats}>
        {[
          { label: "Market Cap", value: currency.marketCap },
          {
            label: "Fully Diluted Valuation",
            value: currency.fullyDilutedValuation,
          },
          { label: "Circulating Supply", value: currency.availableSupply },
          { label: "Total Supply", value: currency.totalSupply },
          { label: "Volume 24h", value: currency.volume },
          { label: "Price Change (1h)", value: currency.priceChange1h },
          { label: "Price Change (24h)", value: currency.priceChange1d },
          { label: "Price Change (7d)", value: currency.priceChange1w },
        ].map(({ label, value }, index) => (
          <div className={classes.blockStats} key={index}>
            <span className={classes.articleStats}>{label}</span>
            {loading ? (
              <SkeletonLoading style={{ width: "50%", height: "30px " }} />
            ) : (
              <span className={classes.textStats}>
                {label.includes("Price Change") ? (
                  <span
                    className={`${classes.textStats} ${value > 0 ? classes.up : classes.down}`}
                  >
                    {value > 0 ? `+${value}` : value}%
                  </span>
                ) : (
                  <NumberFormatter number={value} />
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default CryptoDetails;
