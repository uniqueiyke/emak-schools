import { makeStyles } from "@material-ui/core/styles";


export default function myStyles() {
    const drawerWidth = 250;
    const themeColor = '#00897b';

    return (makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('md')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('md')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
            padding: 0,
            backgroundColor: themeColor
        },
        menuButton: {
            marginRight: theme.spacing(2),
            color: 'white',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginLeft: drawerWidth,
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
            },
        },
        divider: {
            backgroundColor: themeColor
        },
        sideNavItems: {
            color: themeColor
        }
    })));
}
