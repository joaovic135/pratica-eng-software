import AppAppBar from "@/components/appAppBar";
import AppFooter from "@/components/appFooter";
import { Box, Grid, Paper } from "@mui/material";
import AppSidebar from "@/components/AppSidebar";
function Hello() {
    return (
        <>
            <AppAppBar></AppAppBar>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    '& > :not(style)': {
                        m: 1,
                        width: '128',
                        height: '128',
                    },
                }}
            >
                <Paper elevation={0} sx={{ flex: 1 }} />
                <Paper/>
                <Paper elevation={3}/>
            </Box>
            <AppFooter></AppFooter>
        </>
    );
}

export default Hello;
