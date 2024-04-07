import {Typography} from "@mui/material";
import * as React from "react";
import CustomMUIDialog from "../../../components/Custom/CustomMUIDialog";
import ReactLoading from "react-loading";
import {makeStyles} from "@mui/styles";
import CustomMUIGrid from "../../../components/Custom/CustomMUIGrid";
import {osLastColumns} from "../../../project-columns";

const useStyles = makeStyles(() => ({
    loading: {
        margin: 'auto'
    },
}));

const OsStatusDialog = (props) => {
    const classes = useStyles();
    const {handleClose, title, open} = props;

    return (
        <CustomMUIDialog handleClose={handleClose} title={title} open={open}>
            {
                props.loading ? <div style={{margin: "auto", display: 'table'}}>
                        <ReactLoading className={classes.loading} type={'spin'} color={'black'} height={50} width={50}/>
                        <Typography fontWeight='bold' fontSize={12} marginTop={2}>در حال دریافت اطلاعات</Typography>
                    </div> :
                    <CustomMUIGrid width={900} data={props.data} columns={osLastColumns}
                                   loading={props.loading}/>
            }
        </CustomMUIDialog>
    );
}

export default OsStatusDialog;
