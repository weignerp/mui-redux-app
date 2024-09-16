import React from "react";
import { Box, useTheme } from "@mui/material";
import TopAppBar from "./TopAppBar";
import { useECharts } from "@kbox-labs/react-echarts";
function Select() {
  const theme = useTheme();
  const [ref, echartsInstance] = useECharts({
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
        areaStyle: {},
      },
    ],
  });

  return (
    <Box className="App" sx={{ px: 5 }}>
      <TopAppBar props={window} />
      <Box sx={{ position: "relative", mt: 10 }}>
        <Box
          sx={{
            p: 1,
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
          }}
        >
          <Box className="Item">Item 1</Box>
          <Box className="Item">Item 2</Box>
          <Box className="Item">Item 3</Box>
          <Box className="Item">Item 4</Box>
          <Box className="Item" ref={ref}>
            Item 5
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default Select;
