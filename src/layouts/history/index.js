import HistoryTable from "./components/HistoryTable";
import ReportChart from "./components/ReportChart";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../examples/Navbars/DashboardNavbar";
import axios from "axios";
import serviceUrls from "../../configuration/serviceUrls";
import DateTimeService from "../../service/DateTimeService";
import CustomNotification from "../../components/Custom/CustomNotification";
import ReactLoading from "react-loading";
import {makeStyles} from "@mui/styles";
import {useEffect, useState} from "react";

const useStyles = makeStyles(() => ({
    loading: {
        margin: 'auto'
    },
}));

function History() {

    const classes = useStyles();
    const [chartData, setChartData] = useState();
    const [loading, setLoading] = useState();
    useEffect(() => {
        setLoading(true);
        axios.get(serviceUrls.urls.GetJobHistoryDetails).then((response) => {
            if (response.status === 200) {
                setChartData(response.data.Data.map((item) => ({
                    ...item,
                    StartDate: item.StartDate ? DateTimeService.toPersianDigitDate(item.StartDate) : '',
                    EndDate: item.EndDate ? DateTimeService.toPersianDigitDate(item.EndDate) : ''
                })));
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در دریافت دیتا');
        }).finally(() => setLoading(false))
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar path={'تاریخچه'}/>
            <div className="chart-container">
                <br/>
                {
                    loading ?
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200}}>
                            <ReactLoading className={classes.loading} type={'spin'} color={'black'} height={50}
                                          width={50}/>
                        </div> :
                        <ReportChart color="dark"
                                     chartData={chartData}
                                     title="نمودار حجم تغیرات دیتا در هر بار اجرا Job"
                                     description="نمودار افقی نشان دهنده `شناسه Job - زمان اجرا` میباشد و نمودار عمودی نشان دهنده حجم تغیرات دیتا در فاصله بین دو اجرا می باشد "
                        />
                }
                <br/>
                <br/>
                <HistoryTable/>
            </div>
        </DashboardLayout>
    );
}

export default History;
