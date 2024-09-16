import { Box } from "@mui/material";
import TopAppBar from "../components/TopAppBar";
import MaterialTable from "../components/MaterialTable";

function Table() {
  return (
    <Box className="App" sx={{ px: 5 }}>
      <TopAppBar props={window} />
      <Box sx={{ position: "relative", mt: 10 }}>
        <MaterialTable />
      </Box>
    </Box>
  );
}
export default Table;
