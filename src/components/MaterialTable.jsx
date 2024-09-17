import React, { useMemo, useState } from "react";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { LinearProgress } from "@mui/material";
import { MRT_Localization_CS } from "material-react-table/locales/cs";
import { fakerCS_CZ as faker } from "@faker-js/faker";
import { Avatar, Box } from "@mui/material";
import { useGetUsersQuery } from "../features/user/userApiSlice";

//recommended flat structure for data, but not required (nested data is fine, but takes more setup in column definitions)
//must be memoized or stable (useState, useMemo, defined outside of the component, etc.)

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
/*
get max value of column amount from variable data
*/
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
  const columns_ = useMemo(
    () => [
      {
        header: "Ticker",
        accessorKey: "ticker", //simple recommended way to define a column
        //more column options can be added here to enable/disable features, customize look and feel, etc.
        //optional custom cell render
        Cell: ({ renderedCellValue, row }) => {
          return <Avatar sx={{ bgcolor: row.amount > 0 ? "green" : "red" }}>{renderedCellValue}</Avatar>;
        },
      },
      { header: "Date", accessorKey: "date", localization: MRT_Localization_CS },
      { header: "Description", accessorKey: "description" },
      { header: "Amount", accessorKey: "amount" },
      {
        header: "Color",
        accessorKey: "amount",
        Cell: ({ renderedCellValue, row }) => {
          return <LinearProgress color={row.amount > 0 ? "success" : "error"} sx={{ width: "65px", height: "10px" }} value={50} />;
        },
      },
      {
        header: "Currency",
        accessorFn: (dataRow) => `${dataRow.amount} ${dataRow.currency}`, //alternate way to access data if processing logic is needed
        accessorKey: "currency",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      { header: "id", accessorKey: "id", localization: "Id" },
      { header: "name", accessorKey: "name", localization: "Jméno" },
      { header: "username", accessorKey: "username", localization: "Uživatel" },
    ],
    []
  );

  const {
    data: { data = [], meta = {} } = {}, //your data and api response will probably be different
    isError,
    isRefetching,
    isLoading,
    refetch,
  } = useGetUsersQuery({
    //<UserApiResponse>
    queryKey: {
      name: "table-data",
      columnFilters: columnFilters || [], //refetch when columnFilters changes
      // globalFilter, //refetch when globalFilter changes
      // pagination.pageIndex, //refetch when pagination.pageIndex changes
      // pagination.pageSize, //refetch when pagination.pageSize changes
      // sorting, //refetch when sorting changes
    },
    /*
    queryFn: async () => {
      const fetchURL = new URL("/api/data", "127.0.0.1:13000");
      console.log("fetchURL", fetchURL);
      //read our state and pass it to the API as query params
      // fetchURL.searchParams.set("start", `${pagination.pageIndex * pagination.pageSize}`);
      // fetchURL.searchParams.set("size", `${pagination.pageSize}`);
      fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      //fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
      // fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));

      //use whatever fetch library you want, fetch, axios, etc
      const response = await fetch(fetchURL.href);
      const json = await response.json(); // as UserApiResponse;
      return json;
    },
    */
    placeholderData: true, //don't go to 0 rows when refetching or paginating to next page
  });
  console.log("table data", data);
  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true, //enable some features
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
    enableDensityToggle: true, //turn off a feature
    enableGlobalFooter: false, //turn off a feature
    enableRowPinning: true,
    localization: MRT_Localization_CS,
    onColumnFiltersChange: setColumnFilters,
    manualFiltering: true,

    state: {
      columnFilters,
      isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
  });

  return <MaterialReactTable table={table} />;
}
export default MaterialTable;
