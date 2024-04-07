
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
// Dashboard components
import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import GridItems from "./components/GridItems";
import axios from "axios";
import serviceUrls from "../../configuration/serviceUrls";
import CustomNotification from "../../components/Custom/CustomNotification";
import * as signalR from "@microsoft/signalr";
import { globalConfig } from "../../configuration/config";
import TempHistory from "./components/TempHistory";
import OsHistory from "./components/OsHistory";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
    setExecuteButtonActive,
    setFeatureClasses,
    setMessage, setOsInsertUpdate,
    setOsUpdateFeatureClasses,
} from "../../store/executeManualSlice";


export const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[900]),
    widths: "120px",
    backgroundColor: green[900],
    "&:hover": {
        backgroundColor: green[800],
    },
}));

const useStyles = makeStyles(() => ({
    executeBox: {
        display: "flex",
        alignItems: "center",
    },
    executeMessage: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 15px",
        fontSize: 16,
        fontWeight: "bold",
        color: "green",
    },
    executeIcon: {
        margin: "0 5px",
    },
}));

function ExecuteManual() {
    const classes = useStyles();
    const featureClasses = useSelector((state) => state.executeManual.featureClasses);
    const osUpdateFeatureClasses = useSelector((state) => state.executeManual.osUpdateFeatureClasses);
    const insertOsUpdate = useSelector((state) => state.executeManual.osInsertUpdate);
    const message = useSelector((state) => state.executeManual.hubMessage);
    const isButtonActive = useSelector((state) => state.executeManual.isExecuteActive);
    const dispatch = useDispatch();

    const [connection, setConnection] = useState(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${globalConfig.config.apiUrl}/HubService`, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => console.log("Connected to SignalR"))
                .catch(err => console.error("Error connecting to SignalR:", err));

            connection.on("ReceiveLayersProgress", (data) => {
                dispatch(setFeatureClasses(data));
            });

            connection.on("ReceiveOsUpdateProgress", (data) => {
                dispatch(setOsUpdateFeatureClasses(data));
            });

            connection.on("ReceiveInsertOsUpdateProgress", (data) => {
                dispatch(setOsInsertUpdate(data));
            });

            connection.on("ReceiveJobMessage", (message) => {
                dispatch(setMessage(message));
            });
        }
    }, [connection]);

    const executeJob = () => {
        dispatch(setFeatureClasses([]));
        dispatch(setOsUpdateFeatureClasses([]));
        dispatch(setExecuteButtonActive(false));
        dispatch(setOsInsertUpdate(null));
        axios.post(serviceUrls.urls.ExecuteJob).then((response) => {
            if (response.status === 200) {
                CustomNotification.showToastSuccess("اجرای جاب با موفقیت به پایان رسید");
            }
        }).catch(() => {
            CustomNotification.showToastError("خطا در اجرای جاب");
        }).finally(() => {
            dispatch(setExecuteButtonActive(true));
            dispatch(setMessage(""));
        });
    };

    return (
        <DashboardLayout>
            <DashboardNavbar path={"اجرا به صورت دستی"} />
            <Container dir="rtl" maxWidth="xl">
                <div className={classes.executeBox}>
                    <ColorButton sx={{ width: 150 }} onClick={() => {
                        executeJob();
                    }} variant="contained" disabled={!isButtonActive}>
                        <FontAwesomeIcon
                            style={{ marginLeft: 10 }}
                            color="white"
                            icon={faPlayCircle} />
                        اجرا
                    </ColorButton>
                    {
                        message ?
                            <span className={classes.executeMessage}>
                                {message}
                                <ReactLoading className={classes.executeIcon} type={"balls"} color={"green"} height={25}
                                              width={25} />
                          </span> : ""
                    }
                </div>
                <Grid marginTop="50px" marginRight="40px" container spacing={2}>
                    {
                        featureClasses.length ?
                            <>
                                <Grid item style={{ border: "2px solid", margin: 5 }} xs={3.7}>
                                    <GridItems featureClasses={featureClasses} dataType={"server"}
                                               title={"میزان پیشرفت دریافت اطلاعات از سمت سرور اصلی GIS"} />
                                </Grid>
                                <Grid item style={{ border: "2px solid", margin: 5 }} xs={3.7}>
                                    <TempHistory featureClasses={featureClasses} dataType={"temp"}
                                                 title={"وضعیت درج اطلاعات در جداول موقت"} />
                                </Grid>
                            </>
                            : ""
                    }
                    {
                        osUpdateFeatureClasses.length ?
                            <Grid item style={{ border: "2px solid", margin: 5 }} xs={3.7}>
                                <OsHistory status={insertOsUpdate} featureClasses={osUpdateFeatureClasses}
                                           dataType={"import_change"} title={"وضعیت درج در جدول Import / OS Change"} />
                            </Grid> : ""
                    }
                </Grid>
            </Container>
        </DashboardLayout>
    );
}

export default ExecuteManual;
