import React, { useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { MRT_Localization_CS } from "material-react-table/locales/cs";
import { data } from "../data/makeData";
import { Box } from "@mui/material";

const localeStringOptions = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
};

//recommended flat structure for data, but not required (nested data is fine, but takes more setup in column definitions)
//must be memoized or stable (useState, useMemo, defined outside of the component, etc.)

/* 
let data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    ticker: faker.string.alpha({ length: { min: 3, max: 5 }, casing: "upper" }),
    currency: faker.finance.currencyCode(),
    amount: faker.finance.amount({ min: 0.01, max: 1000, precision: 0.01 }),
    date: faker.date.past().toDateString(),
    description: faker.lorem.sentence(),
    id: i,
  });
}
let maxValue = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].amount > maxValue) {
    maxValue = data[i].amount;
  }
}
let minValue = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].amount < minValue) {
    minValue = data[i].amount;
  }
}
 */
/*
const data = [
  {
    name: "John", // key "name" matches `accessorKey` in ColumnDef down below
    age: 30, // key "age" matches `accessorKey` in ColumnDef down below
  },
  {
    name: "Sara",
    age: 25,
  },
];
*/
function MaterialTable() {
  const [columnFilters, setColumnFilters] = useState();

  const columns = useMemo(
    () => [
      {
        header: "First Name",
        accessorKey: "firstName",
      },
      {
        header: "Last Name",
        accessorKey: "lastName",
      },
      {
        header: "Gender",
        accessorKey: "gender",
      },
      {
        header: "State",
        accessorKey: "state",
      },
      {
        header: "Salary",
        accessorKey: "salary",
        aggregationFn: ["count", "mean", "median", "min", "max"],
        //required to render an aggregated cell, show the average salary in the group
        AggregatedCell: ({ cell }) => (
          <>
            Count: <Box sx={{ color: "success.main", fontWeight: "bold" }}>{cell.getValue()?.[0]}</Box>
            Average:{" "}
            <Box sx={{ color: "success.main", fontWeight: "bold" }}>
              {cell.getValue()?.[1]?.toLocaleString?.("en-US", localeStringOptions)}
            </Box>
            Median:{" "}
            <Box sx={{ color: "success.main", fontWeight: "bold" }}>
              {cell.getValue()?.[2]?.toLocaleString?.("en-US", localeStringOptions)}
            </Box>
            Min:{" "}
            <Box sx={{ color: "success.main", fontWeight: "bold" }}>
              {cell.getValue()?.[3]?.toLocaleString?.("en-US", localeStringOptions)}
            </Box>
            Max:{" "}
            <Box sx={{ color: "success.main", fontWeight: "bold" }}>
              {cell.getValue()?.[4]?.toLocaleString?.("en-US", localeStringOptions)}
            </Box>
          </>
        ),
        //customize normal cell render on normal non-aggregated rows
        Cell: ({ cell }) => <>{cell.getValue()?.toLocaleString?.("en-US", localeStringOptions)}</>,
      },
    ],
    []
  );

  console.log("table data", data);
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    enableStickyHeader: true,
    initialState: {
      density: "compact",
      expanded: true, //expand all groups by default
      grouping: ["state"], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
      sorting: [{ id: "state", desc: false }], //sort by state by default
    },
    muiToolbarAlertBannerChipProps: { color: "primary" },
    muiTableContainerProps: { sx: { maxHeight: 700 } },
  });

  return <MaterialReactTable table={table} />;
}
export default MaterialTable;
