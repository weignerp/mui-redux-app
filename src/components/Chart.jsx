import React, { useEffect, useRef } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import * as echarts from "echarts";
import { Height } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import langCS from "../extensions/echarts/i18n/langCS.tjs";

function Chart() {
  const refChart = useRef(null);
  const theme = useTheme();
  const mXs = useMediaQuery(theme.breakpoints.up("xs"));
  const mSm = useMediaQuery(theme.breakpoints.up("sm"));
  const mMd = useMediaQuery(theme.breakpoints.up("md"));

  /*
  Responsivity
  https://echarts.apache.org/en/tutorial.html#Responsive%20Mobile-End
  */
  const Sizes = [
    {
      scr: "xs",
      w: 200,
      h: 200,
    },
    {
      scr: "sm",
      w: 300,
      h: 300,
    },
    {
      scr: "md",
      w: 400,
      h: 300,
    },
    {
      scr: "xl",
      w: 400,
      h: 400,
    },
  ];

  const getSize = (xs, sm, md) => {
    let media = "xl";
    if (xs) {
      media = "xs";
    } else if (sm) {
      media = "sm";
    } else if (md) {
      media = "md";
    }
    return Sizes.filter((item) => item.scr === media);
  };

  useEffect(() => {
    const myChart = echarts.init(refChart.current, "light");
    echarts.registerLocale("CS", langCS);
    let s = getSize(mXs, mSm, mMd);
    //console.log(`Sizes: ${JSON.stringify(s)}`);
    let count = 0;
    myChart.showLoading();

    let interval = setInterval(() => {
      count = count + 1;
      if (count === 1) {
        clearInterval(interval);
        myChart.hideLoading();
      }
      console.log(`interval: ${count}`);
    }, 1000);
    console.log(`Settign options`);
    const options = {
      title: {
        text: "Dynamic Data",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#283b56",
          },
        },
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      locale: "CS",
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };

    myChart.setOption(options);

    console.log(`locale: ${options.locale}`);

    return () => {
      myChart.dispose();
    };
  }, [mMd, mSm, mXs]);

  const hadleClick = () => {
    console.log(`Button: click`);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        ref={refChart}
        sx={{
          background: `${theme.palette.background}`,
          borderColor: `${theme.palette.secondary.darker}`,
          borderRadius: 2,
          border: 3,
          boxShadow: 3,
          height: { xs: 300, md: 400 },
          width: { xs: 300, sm: 400 },
        }}
      />
      <Button variant="contained" onClick={hadleClick}>
        Chache Size
      </Button>
    </Box>
  );
}

export default Chart;
