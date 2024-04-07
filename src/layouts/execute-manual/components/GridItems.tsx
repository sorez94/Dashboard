import React from "react";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { yellow } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";


export const LinearProgressWithLabel = ({progress}) => {
    return (
        <div>
            <div style={{ width: '100%', border: '1px solid #000', borderRadius: '5px', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '15px',
                        backgroundColor: yellow[900],
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '20px',
                    }}
                >
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles(() => ({
  field: {
    height: 30,
    display: "flex",
    alignItems: "center"
  },
}));

const GridItems = (props) => {
    if (!props.featureClasses) return;

    const classes = useStyles();

    return (
        <>
            <Typography fontSize={14} fontWeight='bold' marginBottom={3} textAlign={'center'}>{props.title}</Typography>
            {props.featureClasses.map((item, index) => (
                <div key={index} className={classes.field}>
                    <Grid item xs={5}>
                        <Typography fontSize={13} fontWeight='bold'>
                            {item.faLayerName}
                        </Typography>
                    </Grid>
                  <Grid item xs={2}>
                    <Typography fontSize={11} fontWeight='bold'>
                      {item.regionName}
                    </Typography>
                  </Grid>
                    <Grid item xs={3}>
                        <LinearProgressWithLabel progress={Math.floor(item.serviceHistoryProgress)} />
                    </Grid>
                    <Grid item xs={2}>
                        <Typography marginLeft={1} fontSize={12}>{Math.floor(item.serviceHistoryProgress)}%</Typography>
                    </Grid>
                </div>
            ))}
        </>
    );
};

export default GridItems;
