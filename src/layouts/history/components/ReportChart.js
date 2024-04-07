import {useMemo} from "react";
import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import {yellow} from "@mui/material/colors";
import configs from "../config";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import {Typography} from "@mui/joy";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const ReportsLineChart = ({color, title, description, chart, chartData}) => {
    const label= chartData?.map(d => `${d.Id} - ${d.StartDate}`);
    const chartDataSet=chartData?.map(d => d.TotalCount);
    const data = {
        labels: label?.slice(-10),
        datasets: [
            {
                label: 'حجم دیتا',
                data: chartDataSet?.slice(-10),
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Background color for the area under the line
                borderColor: yellow[900], // Border color for the line
                borderWidth: 3,
            },
        ],
    };
    const {options} = configs(data.labels || [], data.datasets || {});
    return (
        <Card sx={{height: "100%"}}>
            <MDBox padding="1rem">
                {useMemo(
                    () => (
                        <MDBox
                            variant="gradient"
                            bgColor={'#fff'}
                            borderRadius="lg"
                            coloredShadow={color}
                            py={4}
                            pr={0.5}
                            mt={-5}
                            height="18.5rem"
                        >
                            <Typography sx={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}> حجم به روزرسانی دیتا </Typography>
                            <Line data={data} options={options} redraw/>
                        </MDBox>
                    ),
                    [chart, color]
                )}
                <MDBox pt={3} pb={1} px={1}>
                    <MDTypography variant="h6" textTransform="capitalize">
                        {title}
                    </MDTypography>
                    <MDTypography component="div" variant="button" color="text" fontWeight="light">
                        {description}
                    </MDTypography>
                    <Divider/>
                </MDBox>
            </MDBox>
        </Card>
    );
}

export default ReportsLineChart;
