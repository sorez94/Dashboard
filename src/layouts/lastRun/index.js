import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import serviceUrls from "../../configuration/serviceUrls";
import CustomNotification from "../../components/Custom/CustomNotification";
import ReactLoading from 'react-loading';
import {makeStyles} from "@mui/styles";
import ServerStatusDialog from "./components/ServerStatusDialog";
import TempStatusDialog from "./components/TempStatusDialog";
import OsStatusDialog from "./components/OsStatusDialog";
import LastRunItems from "./components/LastRunItems";

const useStyles = makeStyles(() => ({
    loading: {
        margin: 'auto'
    },
}));

const LastRun = () => {
    const classes = useStyles();
    const [openServerStatusDialog, setOpenServerStatusDialog] = useState(false);
    const [openTempStatusDialog, setOpenTempStatusDialog] = useState(false);
    const [openImportChangeStatusDialog, setOpenImportChangeStatusDialog] = useState(false);
    const [lastLayersHistory, setLastLayersHistory] = useState([]);
    const [lastLayersHistoryLength, setLastLayersHistoryLength] = useState(0);
    const [lastTempHistory, setLastTempHistory] = useState([]);
    const [lastTempHistoryLength, setLastTempHistoryLength] = useState(0);
    const [lastOsHistory, setLastOsHistory] = useState([]);
    const [lastOsHistoryLength, setLastOsHistoryLength] = useState(0);
    const [loading, setLoading] = useState(true);
    const [osHistoriesDateRange, setOsHistoriesDateRange] = useState({
        MinimumStartDate: '',
        MaximumEndDate: ''
    });
    const [serviceHistoriesDateRange, setServiceHistoriesDateRange] = useState({
        MinimumStartDate: '',
        MaximumEndDate: ''
    });
    const [tempHistoriesDateRange, setTempHistoriesDateRange] = useState({
        MinimumStartDate: '',
        MaximumEndDate: ''
    });

    useEffect(() => {
        setLoading(true)
        axios.get(serviceUrls.urls.GetServiceHistoriesDateRange).then((response) => {
            if (response.status === 200) {
                setServiceHistoriesDateRange(response.data.Data)
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت تاریخ دیتا از سرور');
        }).finally(() => setLoading(false))
    }, []);

    useEffect(() => {
        setLoading(true)
        axios.get(serviceUrls.urls.GetOSHistoriesDateRange).then((response) => {
            if (response.status === 200) {
                setOsHistoriesDateRange(response.data.Data)
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت تاریخ درج در جدول واسط');
        }).finally(() => setLoading(false))
    }, []);

    // useEffect(() => {
    //     setLoading(true)
    //     axios.get(serviceUrls.urls.GetTempHistoriesDateRange).then((response) => {
    //         if (response.status === 200) {
    //             setTempHistoriesDateRange(response.data.Data)
    //         }
    //     }).catch(() => {
    //         CustomNotification.showToastError('خطا در دریافت تاریخ درج در جداول واسط');
    //     }).finally(() => setLoading(false))
    // }, []);

    useEffect(() => {
        axios.get(serviceUrls.urls.GetLastLayersHistory).then((response) => {
            if (response.status === 200) {
                setLastLayersHistory(response.data.Data);
                setLastLayersHistoryLength(response.data.Data.length)
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت لیست لایه ها');
        }).finally(() => setLoading(false))
    }, [open]);

    // useEffect(() => {
    //     axios.get(serviceUrls.urls.GetLastLayersTempHistory).then((response) => {
    //         if (response.status === 200) {
    //             setLastTempHistory(response.data.Data)
    //             setLastTempHistoryLength(response.data.Data.length)
    //         }
    //     }).catch(() => {
    //         CustomNotification.showToastError('خطا در دریافت لیست لایه ها');
    //     }).finally(() => setLoading(false))
    // }, [open]);

    useEffect(() => {
        axios.get(serviceUrls.urls.GetLastLayersOSHistory).then((response) => {
            if (response.status === 200) {
                setLastOsHistory(response.data.Data)
                setLastOsHistoryLength(response.data.Data.length)
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت لیست لایه ها');
        }).finally(() => setLoading(false))
    }, [open]);

    const handleClose = () => {
        setOpenServerStatusDialog(false);
        setOpenImportChangeStatusDialog(false);
        setOpenTempStatusDialog(false)
    }

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar path={'وضعیت آخرین اجرا'}/>
                {
                    loading ? <div style={{margin: "auto", display: 'table'}}>
                        <ReactLoading className={classes.loading} type={'spin'} color={'black'} height={50} width={50}/>
                        <Typography fontWeight='bold' fontSize={12} marginTop={2}>در حال دریافت اطلاعات</Typography>
                    </div> : (
                        <>
                            <Typography display='block' textAlign='center' fontWeight='bold' fontSize='20px'>آخرین وضعیت
                                دریافت اطلاعات از سرور</Typography>
                            <LastRunItems
                                col1={'وضعیت دریافت دیتا از سرور اصلی GIS:'}
                                col2={`تعداد ${lastLayersHistoryLength} لایه از سرور دریافت گردید.`}
                                col3={'تاریخ شروع :'}
                                col4={serviceHistoriesDateRange.MinimumStartDate}
                                col5={'تاریخ پایان :'}
                                col6={serviceHistoriesDateRange.MaximumEndDate}
                                onclick={() => {
                                    setOpenServerStatusDialog(true)
                                }}
                            />
                            {/*<LastRunItems*/}
                            {/*    col1={'وضعیت درج دیتا در جداول موقت :'}*/}
                            {/*    col2={`تعداد ${lastTempHistoryLength} لایه در جداول موقت درج شده اند.`}*/}
                            {/*    col3={'تاریخ شروع :'}*/}
                            {/*    col4={tempHistoriesDateRange.MinimumStartDate}*/}
                            {/*    col5={'تاریخ پایان :'}*/}
                            {/*    col6={tempHistoriesDateRange.MaximumEndDate}*/}
                            {/*    onclick={() => {*/}
                            {/*        setOpenTempStatusDialog(true)*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <LastRunItems
                                col1={'بررسی حجم تغیرات دیتا :'}
                                col2={`تعداد ${lastOsHistoryLength} لایه در جدول واسط درج شده اند.`}
                                col3={'تاریخ شروع :'}
                                col4={osHistoriesDateRange.MinimumStartDate}
                                col5={'تاریخ پایان :'}
                                col6={osHistoriesDateRange.MaximumEndDate}
                                onclick={() => {
                                    setOpenImportChangeStatusDialog(true)
                                }}
                            />
                        </>)
                }
            </DashboardLayout>
            <ServerStatusDialog open={openServerStatusDialog}
                                data={lastLayersHistory}
                                loading={loading}
                                title={'آخرین وضعیت دریافت اطلاعات از سرور'}
                                handleClose={handleClose}/>
            {/*<TempStatusDialog open={openTempStatusDialog}*/}
            {/*                  loading={loading}*/}
            {/*                  data={lastTempHistory}*/}
            {/*                  title={'آخرین وضعیت درج در جداول موقت'}*/}
            {/*                  handleClose={handleClose}/>*/}
            <OsStatusDialog open={openImportChangeStatusDialog}
                            loading={loading}
                            data={lastOsHistory}
                            title={'آخرین وضعیت درج در جدول واسط'}
                            handleClose={handleClose}/>
        </>
    );
}

export default LastRun;
