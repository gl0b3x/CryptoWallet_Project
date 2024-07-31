import classes from "./ListOfCurrencies.module.css";
import { motion } from "framer-motion";
import Api from "../Api/Api.js";
import { useState, useEffect } from "react";
import NumberFormatter from "../Tools/NumberFormatter.jsx";
import FormatPrice from "../Tools/FormatPrice.jsx";
import { Link } from "react-router-dom";
import SelectTimeRange from "../SelectTimeRange/SelectTimeRange.jsx";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import Pagination from "../Pagination/Pagination.jsx";
import SkeletonLoading from "../Tools/SkeletonLoading.jsx";

const ListOfCurrencies = () => {
  const [loading, setLoading] = useState(false);
  const [timeChange, setTimeChange] = useState("priceChange1d");
  const [currencies, setCurrencies] = useState([
    {
      id: "bitcoin",
      icon: "https://static.coinstats.app/coins/1650455588819.png",
      name: "Bitcoin",
      symbol: "BTC",
      rank: 1,
      price: 65000,
      priceBtc: 1,
      volume: 36526377747.56475,
      marketCap: 1318063855376.9915,
      availableSupply: 19729309,
      totalSupply: 21000000,
      priceChange1h: -0.57,
      priceChange1d: -0.56,
      priceChange1w: 5.69,
      redditUrl: "https://www.reddit.com/r/Bitcoin/",
      websiteUrl: "https://bitcoin.org",
      twitterUrl: "https://twitter.com/bitcoin",
      explorers: [
        "https://mempool.space/",
        "https://blockchair.com/bitcoin/",
        "https://btc.com/",
        "https://btc.tokenview.io/",
        "https://www.oklink.com/btc",
        "https://3xpl.com/bitcoin",
        "https://blockchain.coinmarketcap.com/chain/bitcoin",
        "https://blockexplorer.one/btc/mainnet",
      ],
    },
    {
      id: "ethereum",
      icon: "https://static.coinstats.app/coins/1650455629727.png",
      name: "Ethereum",
      symbol: "ETH",
      rank: 2,
      price: 3448.263706929709,
      priceBtc: 0.05162289274452001,
      volume: 30582178421.22472,
      marketCap: 414585648929.2501,
      availableSupply: 120230262,
      totalSupply: 120230262,
      priceChange1h: -0.64,
      priceChange1d: -1.62,
      priceChange1w: 2.26,
      redditUrl: "https://www.reddit.com/r/ethereum",
      websiteUrl: "https://www.ethereum.org/",
      twitterUrl: "https://twitter.com/ethereum",
      contractAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      decimals: 18,
      explorers: [
        "https://etherscan.io/",
        "https://ethplorer.io/",
        "https://blockchair.com/ethereum",
        "https://eth.tokenview.io/",
        "https://www.oklink.com/eth",
        "https://3xpl.com/ethereum",
        "https://blockchain.coinmarketcap.com/chain/ethereum",
      ],
    },
    {
      id: "tether",
      icon: "https://static.coinstats.app/coins/1650455771843.png",
      name: "Tether",
      symbol: "USDT",
      rank: 3,
      price: 0.9977136074999999,
      priceBtc: 0.000014936462790306696,
      volume: 47606663298.04437,
      marketCap: 113823862399.55084,
      availableSupply: 114084704813,
      totalSupply: 114084704813,
      priceChange1h: -0.05,
      priceChange1d: -0.16,
      priceChange1w: -0.22,
      redditUrl: "https://www.reddit.com",
      websiteUrl: "https://tether.to/",
      twitterUrl: "https://twitter.com/Tether_to",
      contractAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      decimals: 18,
      explorers: [
        "https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7",
        "https://ethplorer.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7",
        "https://explorer.kava.io/token/0x919c1c267bc06a7039e03fcc2ef738525769109c",
        "https://avascan.info/blockchain/c/address/0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7/token",
        "https://solscan.io/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        "https://nearblocks.io/token/usdt.tether-token.near",
        "https://tonscan.org/address/EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
        "https://celoscan.io/token/0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
        "https://explorer.celo.org/mainnet/token/0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
        "https://www.omniexplorer.info/asset/31",
      ],
    },
    {
      id: "binance-coin",
      icon: "https://static.coinstats.app/coins/1666608145347.png",
      name: "BNB",
      symbol: "BNB",
      rank: 4,
      price: 590.8555899721147,
      priceBtc: 0.008845516857464732,
      volume: 3779718046.4103794,
      marketCap: 90906766279.08817,
      availableSupply: 153856150,
      totalSupply: 153856150,
      priceChange1h: -0.55,
      priceChange1d: -1.64,
      priceChange1w: 3.15,
      redditUrl: "https://www.reddit.com/r/binance",
      websiteUrl: "https://www.binance.com",
      twitterUrl: "https://twitter.com/binance",
      contractAddress: "BNB",
      decimals: 18,
      explorers: [
        "https://bscscan.com",
        "https://explorer.binance.org/",
        "https://binance.mintscan.io/",
        "https://etherscan.io/token/0xb8c77482e45f1f44de1745f52c74426c631bdd52",
        "https://ethplorer.io/address/0xb8c77482e45f1f44de1745f52c74426c631bdd52",
        "https://www.oklink.com/bsc",
        "https://3xpl.com/bnb",
      ],
    },
    {
      id: "solana",
      icon: "https://static.coinstats.app/coins/1701234596791.png",
      name: "Solana",
      symbol: "SOL",
      rank: 5,
      price: 177.8342874383727,
      priceBtc: 0.00266230228514144,
      volume: 6346069033.087691,
      marketCap: 82583963428.64961,
      availableSupply: 464387181,
      totalSupply: 580586264,
      priceChange1h: -0.82,
      priceChange1d: 2.01,
      priceChange1w: 16.01,
      redditUrl: "https://www.reddit.com/r/solana",
      websiteUrl: "https://solana.com/",
      twitterUrl: "https://twitter.com/solana",
      contractAddress: "0x7dff46370e9ea5f0bad3c4e29711ad50062ea7a4",
      decimals: 18,
      explorers: [
        "https://solscan.io/",
        "https://xray.helius.xyz/",
        "https://solana.fm/",
        "https://solanabeach.io/",
        "https://www.oklink.com/sol",
        "https://explorer.solana.com/",
      ],
    },
    {
      id: "ripple",
      icon: "https://static.coinstats.app/coins/XRPdnqGJ.png",
      name: "XRP",
      symbol: "XRP",
      rank: 6,
      price: 0.6136034466252897,
      priceBtc: 0.00000918606800551488,
      volume: 1328989067.410962,
      marketCap: 34306250776.92056,
      availableSupply: 55909481874,
      totalSupply: 99987431729,
      priceChange1h: 0.94,
      priceChange1d: 5.03,
      priceChange1w: 15.87,
      redditUrl: "https://www.reddit.com/r/ripple",
      websiteUrl: "https://ripple.com/currency/",
      twitterUrl: "https://twitter.com/Ripple",
      contractAddress: "0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe",
      decimals: 18,
      explorers: [
        "https://blockchair.com/ripple",
        "https://xrpcharts.ripple.com",
        "https://xrpscan.com/",
        "https://bithomp.com/explorer/",
      ],
    },
    {
      id: "usd-coin",
      icon: "https://static.coinstats.app/coins/1650455825065.png",
      name: "USDC",
      symbol: "USDC",
      rank: 7,
      price: 0.999301,
      priceBtc: 0.000014968600141492094,
      volume: 8924760492,
      marketCap: 33912572762,
      availableSupply: 33908850931,
      totalSupply: 33914193537,
      priceChange1h: -0.15,
      priceChange1d: -0.04,
      priceChange1w: -0.21,
      redditUrl: "https://www.reddit.com",
      websiteUrl: "https://www.circle.com/en/usdc",
      twitterUrl: "https://twitter.com/circle",
      contractAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      decimals: 18,
      explorers: [
        "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "https://bscscan.com/token/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        "https://nearblocks.io/token/17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
        "https://ethplorer.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "https://basescan.org/token/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
        "https://arbiscan.io/token/0xaf88d065e77c8cc2239327c5edb3a432268e5831",
        "https://binplorer.com/address/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
        "https://explorer.kava.io/token/0xfa9343c3897324496a05fc75abed6bac29f8a40f",
        "https://ftmscan.com/token/0x04068da6c83afcfa0e13ba15a6696662335d5b75",
        "https://explorer.energi.network/token/0xffd7510ca0a3279c7a5f50018a26c21d5bc1dbcf",
      ],
    },
    {
      id: "staked-ether",
      icon: "https://static.coinstats.app/coins/staked-etheruqt.png",
      name: "Lido Staked Ether",
      symbol: "STETH",
      rank: 8,
      price: 3445.12,
      priceBtc: 0.05160469540154292,
      volume: 55299850,
      marketCap: 33691092506,
      availableSupply: 9786201,
      totalSupply: 9786201,
      priceChange1h: -0.95,
      priceChange1d: -1.66,
      priceChange1w: 1.95,
      redditUrl: "https://www.reddit.com/r/lidofinance/",
      websiteUrl: "https://www.lido.fi",
      twitterUrl: "https://twitter.com/lidofinance",
      contractAddress: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      decimals: 18,
      explorers: [
        "https://etherscan.io/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
        "https://ethplorer.io/address/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
        "https://ethereum.dex.guru/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
      ],
    },
    {
      id: "dogecoin",
      icon: "https://static.coinstats.app/coins/DogecoinIZai5.png",
      name: "Dogecoin",
      symbol: "DOGE",
      rank: 9,
      price: 0.13722896386074504,
      priceBtc: 0.0000020544125058035362,
      volume: 1414793300.5093818,
      marketCap: 19926681135.037395,
      availableSupply: 145207546384,
      totalSupply: 145221276384,
      priceChange1h: -0.43,
      priceChange1d: 3.89,
      priceChange1w: 15.39,
      redditUrl: "https://www.reddit.com/r/dogecoin/",
      websiteUrl: "http://dogecoin.com/",
      twitterUrl: "https://twitter.com/dogecoin",
      contractAddress: "0xba2ae424d960c26247dd6c32edc70b295c744c43",
      decimals: 18,
      explorers: [
        "https://blockchair.com/dogecoin",
        "https://doge.tokenview.io/",
        "https://3xpl.com/dogecoin",
        "https://www.oklink.com/doge",
      ],
    },
    {
      id: "the-open-network",
      icon: "https://static.coinstats.app/coins/1685602314954.png",
      name: "Toncoin",
      symbol: "TON",
      rank: 10,
      price: 6.931090265093495,
      priceBtc: 0.0001037632152780135,
      volume: 126869479.19143428,
      marketCap: 17430845307.792267,
      availableSupply: 2514877839,
      totalSupply: 5109366640,
      priceChange1h: -0.27,
      priceChange1d: -3.45,
      priceChange1w: -6.52,
      redditUrl: "https://www.reddit.com",
      websiteUrl: "https://ton.org/",
      twitterUrl: "https://twitter.com/ton_blockchain",
      contractAddress: "0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
      decimals: 18,
      explorers: [
        "https://tonscan.org",
        "https://tonmoon.org/explorer/",
        "https://youton.org/",
        "https://3xpl.com/ton",
        "https://tonapi.io/",
        "https://etherscan.io/token/0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
        "https://ethplorer.io/address/0x582d872a1b094fc48f5de31d3b73f2d9be47def1",
        "https://bscscan.com/token/0x76a797a59ba2c17726896976b7b3747bfd1d220f",
        "https://binplorer.com/address/0x76a797a59ba2c17726896976b7b3747bfd1d220f",
        "https://tonscan.org/address/EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c",
      ],
    },
  ]);
  const [sortedCurrencies, setSortedCurrencies] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "rank",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    setLoading(true);
    async function getCoinsData() {
      try {
        const response = await Api.getAllCrypto({
          limit: "100",
          page: currentPage,
        });
        setCurrencies(response.data.result);
        setPageCount(response.data.meta.pageCount);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getCoinsData();
  }, [currentPage]);

  useEffect(() => {
    const sortedData = [...currencies].sort((a, b) => {
      let aValue, bValue;

      if (sortConfig.key === "change") {
        aValue = a[timeChange];
        bValue = b[timeChange];
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (typeof aValue === "string" && !isNaN(aValue)) {
        aValue = parseFloat(aValue);
      }

      if (typeof bValue === "string" && !isNaN(bValue)) {
        bValue = parseFloat(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedCurrencies(sortedData);
  }, [currencies, sortConfig, timeChange]);

  const handleSort = (key) => {
    let direction = "desc";
    if (sortConfig.key === key) {
      direction = sortConfig.direction === "desc" ? "asc" : "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <main className={classes.listWrapper}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className={classes.article}
      >
        Market Overview
      </motion.p>
      <div className={classes.listTokens}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className={classes.coinDescribe}
        >
          <div className={classes.generalInfo}>
            <span
              className={classes.rankCoin}
              onClick={() => handleSort("rank")}
            >
              Rank
              {sortConfig.key === "rank" ? (
                sortConfig.direction === "desc" ? (
                  <TiArrowSortedDown />
                ) : (
                  <TiArrowSortedUp />
                )
              ) : (
                <TiArrowUnsorted />
              )}
            </span>
            <span
              className={classes.coinSymbol}
              onClick={() => handleSort("name")}
            >
              Name
              {sortConfig.key === "name" ? (
                sortConfig.direction === "desc" ? (
                  <TiArrowSortedDown />
                ) : (
                  <TiArrowSortedUp />
                )
              ) : (
                <TiArrowUnsorted />
              )}
            </span>
          </div>
          <span
            className={classes.coinPrice}
            onClick={() => handleSort("price")}
          >
            Price
            {sortConfig.key === "price" ? (
              sortConfig.direction === "desc" ? (
                <TiArrowSortedDown />
              ) : (
                <TiArrowSortedUp />
              )
            ) : (
              <TiArrowUnsorted />
            )}
          </span>
          <span className={classes.coinChange}>
            <SelectTimeRange
              selectedOption={timeChange}
              setSelectedOption={setTimeChange}
            />
            <span onClick={() => handleSort("change")}>
              Change
              {sortConfig.key === "change" ? (
                sortConfig.direction === "desc" ? (
                  <TiArrowSortedDown />
                ) : (
                  <TiArrowSortedUp />
                )
              ) : (
                <TiArrowUnsorted />
              )}
            </span>
          </span>
          <span
            className={classes.coinVolume}
            onClick={() => handleSort("volume")}
          >
            24h Volume
            {sortConfig.key === "volume" ? (
              sortConfig.direction === "desc" ? (
                <TiArrowSortedDown />
              ) : (
                <TiArrowSortedUp />
              )
            ) : (
              <TiArrowUnsorted />
            )}
          </span>
          <span
            className={classes.coinMarketCap}
            onClick={() => handleSort("marketCap")}
          >
            Market Cap
            {sortConfig.key === "marketCap" ? (
              sortConfig.direction === "desc" ? (
                <TiArrowSortedDown />
              ) : (
                <TiArrowSortedUp />
              )
            ) : (
              <TiArrowUnsorted />
            )}
          </span>
          <div className={classes.priceChangeMobile}>
            <span
              className={classes.priceMobile}
              onClick={() => handleSort("price")}
            >
              Price
              {sortConfig.key === "price" ? (
                sortConfig.direction === "desc" ? (
                  <TiArrowSortedDown />
                ) : (
                  <TiArrowSortedUp />
                )
              ) : (
                <TiArrowUnsorted />
              )}
            </span>
            <span className={classes.changeMobile}>
              <SelectTimeRange
                selectedOption={timeChange}
                setSelectedOption={setTimeChange}
              />
              Change
            </span>
          </div>
          <div className={classes.volCapMobile}>
            <span
              className={classes.volumeMobile}
              onClick={() => handleSort("volume")}
            >
              24h Volume
              {sortConfig.key === "volume" ? (
                sortConfig.direction === "desc" ? (
                  <TiArrowSortedDown />
                ) : (
                  <TiArrowSortedUp />
                )
              ) : (
                <TiArrowUnsorted />
              )}
            </span>
            <span className={classes.marketCapMobile}>Market Cap</span>
          </div>
        </motion.div>
        {loading
          ? Array.from({ length: 100 }).map((_, index) => (
              <SkeletonLoading
                key={index}
                style={{ width: "100%", height: "50px" }}
              />
            ))
          : sortedCurrencies.map((coin) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                animate={{ opacity: 1, y: 0 }}
                key={coin.id}
              >
                <Link
                  to={`/cryptocurrency/${coin.id.toLowerCase()}`}
                  className={classes.coinBlock}
                >
                  <div className={classes.generalInfo}>
                    <span className={classes.rankCoin}>{coin.rank}</span>
                    <img
                      className={classes.coinImage}
                      src={coin.icon}
                      alt={""}
                    />
                    <div className={classes.nameWrapper}>
                      <span className={classes.coinSymbol}>{coin.symbol}</span>
                      <span className={classes.coinName}>{coin.name}</span>
                    </div>
                  </div>
                  <span className={classes.coinPrice}>
                    <FormatPrice price={coin.price} /> $
                  </span>
                  <span
                    className={`${classes.coinChange} ${coin[timeChange] > 0 ? classes.up : classes.down}`}
                  >
                    {coin.priceChange1h &&
                    coin.priceChange1d &&
                    coin.priceChange1w ? (
                      <>
                        {coin[timeChange] > 0
                          ? "+" + coin[timeChange]
                          : coin[timeChange]}
                      </>
                    ) : (
                      0
                    )}
                    %
                  </span>
                  <span className={classes.coinVolume}>
                    <NumberFormatter
                      number={coin.volume > 1 ? coin.volume.toFixed(0) : 0}
                    />{" "}
                    $
                  </span>
                  <span className={classes.coinMarketCap}>
                    <NumberFormatter
                      number={
                        coin.marketCap > 1 ? coin.marketCap.toFixed(0) : 0
                      }
                    />{" "}
                    $
                  </span>
                  <div className={classes.priceChangeMobile}>
                    <span className={classes.priceMobile}>
                      <FormatPrice price={coin.price} /> $
                    </span>
                    <span
                      className={`${classes.changeMobile} ${
                        coin[timeChange] > 0 ? classes.up : classes.down
                      }`}
                    >
                      {coin.priceChange1h &&
                      coin.priceChange1d &&
                      coin.priceChange1w ? (
                        <>
                          {coin[timeChange] > 0
                            ? "+" + coin[timeChange]
                            : coin[timeChange]}
                        </>
                      ) : (
                        0
                      )}
                      %
                    </span>
                  </div>
                  <div className={classes.volCapMobile}>
                    <span className={classes.volumeMobile}>
                      <NumberFormatter
                        number={coin.volume > 1 ? coin.volume.toFixed(0) : 0}
                      />{" "}
                      $
                    </span>
                    <span className={classes.marketCapMobile}>
                      <NumberFormatter
                        number={
                          coin.marketCap > 1 ? coin.marketCap.toFixed(0) : 0
                        }
                      />
                      $
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </main>
  );
};

export default ListOfCurrencies;
