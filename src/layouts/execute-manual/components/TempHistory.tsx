import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import React from "react";
import ReactLoading from "react-loading";
import { makeStyles } from "@mui/styles";
import { faCheckCircle, faReceipt } from "@fortawesome/free-solid-svg-icons";
import CustomFontAwesomeIcon from "../../../components/Custom/CustomFontAwesomeIcon";
import ProgressStatus from "../../../enums/ProgressStatus";

const useStyles = makeStyles(() => ({
  field: {
    height: 30,
    display: "flex",
    alignItems: "center"
  },
  loadingIcon: {
    display: "flex",
    justifyContent: "center"
  }
}));

const TempHistory = (props) => {
  if (!props.featureClasses) return;

  const classes = useStyles();

  return (
    <>
      <Typography fontSize={14} fontWeight='bold' marginBottom={3} textAlign={'center'}>{props.title}</Typography>
      {props.featureClasses.map((item, index) => (
        <div key={index} className={classes.field}>
          <Grid item xs={7}>
            <Typography fontSize={13} fontWeight='bold'>
              {item.faLayerName}
            </Typography>
          </Grid>
          <Grid item xs={4} className={classes.loadingIcon}>
            {
              item.tempHistoryStatus == ProgressStatus.Success ? <CustomFontAwesomeIcon icon={faCheckCircle} color={"green"}/> : ""
            }
            {
              item.tempHistoryStatus == ProgressStatus.InProgress ? <ReactLoading type={'cylon'} color={'black'} height={30} width={30}/> : ""
            }
          </Grid>
        </div>
      ))}
    </>
  );
}

export default TempHistory;