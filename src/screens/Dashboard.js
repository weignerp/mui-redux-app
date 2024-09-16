import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import TopAppBar from '../components/TopAppBar';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (    
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />        
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Typography sx={{ color: 'success.main' }}>          
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
            fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
            aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
            cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
            at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
            Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
            numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
            asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
            assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
            soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
            ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
            soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
            Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
            delectus quo eius exercitationem tempore. Delectus sapiente, provident
            corporis dolorum quibusdam aut beatae repellendus est labore quisquam
            praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
            deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
            fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
            recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
            debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
            praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
            voluptate iure labore, repellendus beatae quia unde est aliquid dolor
            molestias libero. Reiciendis similique exercitationem consequatur, nobis
            placeat illo laudantium! Enim perferendis nulla soluta magni error,
            provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
            iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
            Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
            reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
            cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
            consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
            Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
            dolores sunt inventore perferendis, aut sapiente modi nesciunt.
          </Typography>
        </Box>
      </Box>
  );
}