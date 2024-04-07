import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";
import { faCheckCircle, faReceipt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomFontAwesomeIcon from "../../../components/Custom/CustomFontAwesomeIcon";
import ProgressStatus from "../../../enums/ProgressStatus";

const useStyles = makeStyles(() => ({
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "14px",
        fontWeight: "bold",
        marginBottom: 24,
    },
    titleIcon: {
        margin: "0 10px",
    },
    field: {
        height: 30,
        display: "flex",
        alignItems: "center",
    },
    loadingIcon: {
        display: "flex",
        justifyContent: "center",
    },
    progressStatusIcon: {
        margin: "0 10px",
    },
}));

const OsHistory = (props) => {
    if (!props.featureClasses) return;

    const classes = useStyles();

    return (
        <>
            <Typography className={classes.title} fontSize={14} fontWeight="bold" marginBottom={3} textAlign={"center"}>
                {props.title}
                {
                    props.status == ProgressStatus.Success ?
                        <CustomFontAwesomeIcon className={classes.progressStatusIcon} icon={faCheckCircle}
                                               color={"green"} /> : ""
                }
                {
                    props.status == ProgressStatus.InProgress ?
                        <ReactLoading className={classes.progressStatusIcon} type={"cylon"} color={"black"} height={30}
                                      width={30} /> : ""
                }
                {
                    props.status == ProgressStatus.Error ?
                        <CustomFontAwesomeIcon className={classes.progressStatusIcon} icon={faTimesCircle}
                                               color={"red"} /> : ""
                }
            </Typography>
            {props.featureClasses.map((item, index) => (
                <div key={index} className={classes.field}>
                    <Grid item xs={7}>
                        <Typography fontSize={13} fontWeight="bold">
                            {item.faLayerName}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.loadingIcon}>
                        {
                            item.status == ProgressStatus.Success ?
                                <CustomFontAwesomeIcon icon={faCheckCircle} color={"green"} /> : ""
                        }
                        {
                            item.status == ProgressStatus.InProgress ?
                                <ReactLoading type={"cylon"} color={"black"} height={30} width={30} /> : ""
                        }
                        {
                            item.status == ProgressStatus.Error ?
                                <CustomFontAwesomeIcon icon={faTimesCircle} color={"red"} /> : ""
                        }
                    </Grid>
                </div>
            ))}
        </>
    );
};

export default OsHistory;