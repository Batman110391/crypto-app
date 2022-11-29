import React from "react";

import axios from "axios";
import { CoinListCategory } from "../config/api";
import { makeStyles } from "@material-ui/core";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

function Categories({ setCoins, setLoading, currency }) {
  const useStyles = makeStyles((theme) => ({
    container: {
      boxSizing: "border-box",
      justifyContent: "center",
      margin: 0,
      minWidth: 0,
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingBottom: "16px",
      display: "flex",
      alignItems: "center",
      justifyVontent: "space-between",
    },
    box: {
      boxSizing: "border-box",
      margin: 0,
      minWidth: 0,
      position: "relative",
    },
    managedBox: {
      boxSizing: "border-box",
      margin: 0,
      minWidth: 0,
      width: "100%",
      whiteSpace: "nowrap",
      display: "flex",
      flexDirection: "row",
      overflow: "scroll",
      scrollbarWidth: "none",
      scrollbars: "none",
    },
    tabCategory: {
      boxSizing: "border-box",
      margin: 0,
      minWidth: 0,
      cursor: "pointer",
      minWidth: "auto",
    },
    active: {
      backgroundColor: "#F5F5F5",
      color: "#1E2329",
    },
    category: {
      boxSizing: "border-box",
      margin: 0,
      minWidth: 0,
      paddingTop: "8px",
      paddingBottom: "8px",
      paddingLeft: "16px",
      paddingRight: "16px",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      marginRight: "16px",
      userSelect: "none",
      color: "#707A8A",
      borderRadius: "4px",
      paddingLeft: "10px !important",
      paddingRight: "10px !important",
      paddingTop: "4px !important",
      paddingBottom: "4px !important",
      marginRight: "16px !important",
      borderRadius: "2px",
    },
    iconCategory: {
      boxSizing: "border-box",
      cursor: "pointer",
      margin: "0px",
      minWidth: "0px",
      position: "absolute",
      top: "0px",
      height: "100%",
      alignItems: "center",
      background: "#f0f8ffc7",
      padding: "0px 4px",
      borderRadius: "5px",
      [theme.breakpoints.up("md")]: {
        display: "none !important",
      },
    },
    next: {
      right: "0px",
    },
    preview: {
      left: "0px",
      display: "none",
    },
  }));

  const classes = useStyles();

  const categoryList = [
    { name: "Tutto", categoryId: "" },
    { name: "Metaverse", categoryId: "metaverse" },
    { name: "Gaming", categoryId: "gaming" },
    { name: "DeFi", categoryId: "defi-index" },
    { name: "Energy", categoryId: "energy" },
    { name: "Fan Token", categoryId: "fan-token" },
    { name: "Marketing", categoryId: "marketing" },
    { name: "Meme Token", categoryId: "meme-token" },
    { name: "NFT", categoryId: "nft-index" },
    { name: "Governance", categoryId: "governance" },
  ];

  const getCategoriesCoin = (categoryId) => {
    fetchCoins(categoryId);
  };

  const fetchCoins = async (category) => {
    setLoading(true);
    const { data } = await axios.get(CoinListCategory(currency, category));

    setCoins(data);
    setLoading(false);
  };

  const moveScrollBar = (move) => {
    var actualLeftPosition;

    const scrollBar = document.querySelector(".scrollbarCategory");

    const calculate = (scrollBar.scrollWidth / categoryList.length) * 2;

    if (move === "N") {
      scrollBar.scrollLeft += calculate;
      actualLeftPosition = scrollBar.scrollLeft + calculate;
      if (actualLeftPosition >= scrollBar.scrollWidth)
        actualLeftPosition = scrollBar.scrollWidth;
    } else {
      scrollBar.scrollLeft -= calculate;
      actualLeftPosition = scrollBar.scrollLeft - calculate;
      if (actualLeftPosition < 0) actualLeftPosition = 0;
    }

    if (actualLeftPosition > 0) {
      document.getElementById("icoPreview").style.display = "block";
    } else {
      document.getElementById("icoPreview").style.display = "none";
    }

    if (actualLeftPosition + calculate + 89 < scrollBar.scrollWidth) {
      document.getElementById("icoNext").style.display = "block";
    } else {
      document.getElementById("icoNext").style.display = "none";
    }
  };

  return (
    <div className={classes.container}>
      <div id="market_filter_coinInfo" className={classes.box}>
        <div className={"scrollbarCategory " + classes.managedBox}>
          {categoryList.map((cat, index) => (
            <div
              id={`tab-${cat.name}`}
              className={classes.tabCategory}
              onClick={() => getCategoriesCoin(cat.categoryId)}
            >
              <div className={classes.category}>
                <div>
                  <div data-bn-type="text">{cat.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          id="icoNext"
          style={{ display: "block", right: 0 }}
          className={classes.iconCategory}
          onClick={() => moveScrollBar("N")}
        >
          <AiOutlineArrowRight
            style={{ verticalAlign: "bottom", color: "black" }}
          />
        </div>
        <div
          id="icoPreview"
          style={{ display: "none", left: 0 }}
          className={classes.iconCategory}
          onClick={() => moveScrollBar("P")}
        >
          <AiOutlineArrowLeft
            style={{ verticalAlign: "bottom", color: "black" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Categories;
