import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import { numberWithCommas } from "../CoinsTable";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
} from "swiper/core";

// Import Swiper styles
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));

  const classes = useStyles();

  const breakpoints = {
    340: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    640: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  };

  return (
    <Swiper
      style={{ width: "100%" }}
      virtual
      breakpoints={breakpoints}
      autoplay={true}
      loop={true}
    >
      {trending.map((coin, index) => {
        let profit = coin?.price_change_percentage_24h >= 0;
        return (
          <SwiperSlide key={"coin" + index} style={{ listStyle: "none" }}>
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
              <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
              />
              <span>
                {coin?.symbol}
                &nbsp;
                <span
                  style={{
                    color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                    fontWeight: 500,
                  }}
                >
                  {profit && "+"}
                  {coin?.price_change_percentage_24h?.toFixed(2)}%
                </span>
              </span>
              <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol} {numberWithCommas(coin?.current_price?.toFixed(2))}
              </span>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousel;
