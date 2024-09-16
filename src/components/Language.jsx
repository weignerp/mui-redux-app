import { Avatar, Box, Card, Icon, IconButton, SvgIcon, Typography } from "@mui/material";
import env from "react-dotenv";
import cz from "../flags/cz.svg";

const Logo = () => (
  <SvgIcon sx={{ color: "red" }}>
    <img src={cz} alt="logo" height={25} width={25} />
  </SvgIcon>
);

export function SvgIconChildren({ icon }) {
  return (
    <SvgIcon sx={{ borderRadius: "50%" }}>
      {/* credit: plus icon from https://heroicons.com/ */}
      <svg xmlns="http://www.w3.org/2000/svg">
        <g transform="scale(0.045 0.045), translate(-165,-30)">
          <image href={icon} />
        </g>
      </svg>
    </SvgIcon>
  );
}
const text = process.env.NODE_ENV;
const test = process.env.REACT_APP_TEST;

const Language = () => {
  return (
    <Box sx={{ position: "relative", mt: 10 }}>
      <Typography>Language</Typography>
      <Avatar alt="Czech" src={cz} color={"primary"}>
        "CZ"
      </Avatar>
      <IconButton color="primary">
        <SvgIconChildren icon={cz} />
      </IconButton>
      <Card sx={{ p: 2, m: 2 }}>
        <Typography p={1} m={1}>
          Current Environment: {text}
        </Typography>
        <Typography p={1} m={1}>
          Test: {test || "undefined!"}
        </Typography>
        <Typography p={1} m={1}>
          API: {env.API_URL || "undefined!"}
        </Typography>
      </Card>
      <Box position={"relative"} ml={5} mt={5} width={24} height={24}>
        {Logo()}
      </Box>
    </Box>
  );
};
export default Language;
