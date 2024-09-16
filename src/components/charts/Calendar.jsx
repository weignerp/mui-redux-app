import React, { useEffect, useRef } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import * as echarts from "echarts";
import { Height } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import langCS from "../extensions/echarts/i18n/langCS.tjs";

function Calendar() {
  const refChart = useRef(null);
  const theme = useTheme();

  const getVirtualData = function (year) {
    const date = +echarts.time.parse(year + "-01-01");
    const end = +echarts.time.parse(+year + 1 + "-01-01");
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    for (let time = date; time < end; time += dayTime) {
      data.push([echarts.time.format(time, "{yyyy}-{MM}-{dd}", false), Math.floor(Math.random() * 1000)]);
    }
    return data;
  };

  const graphData = [
    ["2017-02-01", 260],
    ["2017-02-04", 200],
    ["2017-02-09", 279],
    ["2017-02-13", 847],
    ["2017-02-18", 241],
    ["2017-02-23", 411],
    ["2017-02-27", 985],
  ];
  const links = () => {
    graphData.map(function (item, idx) {
      return {
        source: idx,
        target: idx + 1,
      };
    });
  };

  useEffect(() => {
    const myChart = echarts.init(refChart.current, "light");
    echarts.registerLocale("CS", langCS);

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
    }, 5000);
    console.log(`Settign options`);
    const options = {
      tooltip: {
        position: "top",
      },
      visualMap: [
        {
          min: 0,
          max: 1000,
          calculable: true,
          seriesIndex: [2, 3, 4],
          orient: "horizontal",
          left: "55%",
          bottom: 20,
        },
        {
          min: 0,
          max: 1000,
          inRange: {
            color: ["grey"],
            opacity: [0, 0.3],
          },
          controller: {
            inRange: {
              opacity: [0.3, 0.6],
            },
            outOfRange: {
              color: "#ccc",
            },
          },
          seriesIndex: [1],
          orient: "horizontal",
          left: "10%",
          bottom: 20,
        },
      ],
      calendar: [
        {
          orient: "vertical",
          yearLabel: {
            margin: 40,
          },
          monthLabel: {
            nameMap: "cn",
            margin: 20,
          },
          dayLabel: {
            firstDay: 1,
            nameMap: "cn",
          },
          cellSize: 40,
          range: "2017-02",
        },
        {
          orient: "vertical",
          yearLabel: {
            margin: 40,
          },
          monthLabel: {
            margin: 20,
          },
          cellSize: 40,
          left: 460,
          range: "2017-01",
        },
        {
          orient: "vertical",
          yearLabel: {
            margin: 40,
          },
          monthLabel: {
            margin: 20,
          },
          cellSize: 40,
          top: 350,
          range: "2017-03",
        },
        {
          orient: "vertical",
          yearLabel: {
            margin: 40,
          },
          dayLabel: {
            firstDay: 1,
            nameMap: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          },
          monthLabel: {
            nameMap: "cn",
            margin: 20,
          },
          cellSize: 40,
          top: 350,
          left: 460,
          range: "2017-04",
        },
      ],
      series: [
        {
          type: "graph",
          edgeSymbol: ["none", "arrow"],
          coordinateSystem: "calendar",
          links: links(),
          symbolSize: 10,
          calendarIndex: 0,
          data: graphData,
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: getVirtualData("2017"),
        },
        {
          type: "effectScatter",
          coordinateSystem: "calendar",
          calendarIndex: 1,
          symbolSize: function (val) {
            return val[1] / 40;
          },
          data: getVirtualData("2017"),
        },
        {
          type: "scatter",
          coordinateSystem: "calendar",
          calendarIndex: 2,
          symbolSize: function (val) {
            return val[1] / 60;
          },
          data: getVirtualData("2017"),
        },
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          calendarIndex: 3,
          data: getVirtualData("2017"),
        },
      ],
    };

    myChart.setOption(options);

    console.log(`locale: ${options.locale}`);

    return () => {
      myChart.dispose();
    };
  }, []);

  const hadleClick = () => {
    console.log(`Button: click`);
  };
  return (
    <Box display={"block"}>
      <Box
        ref={refChart}
        sx={{
          position: "relative",
          mt: 10,
          p: 1,
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

export default Calendar;
