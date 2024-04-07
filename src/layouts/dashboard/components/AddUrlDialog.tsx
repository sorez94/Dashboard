import React, {useEffect, useState} from 'react';
import CustomMUIDialog from "../../../components/Custom/CustomMUIDialog";
import {TextField} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk, faXmark} from "@fortawesome/free-solid-svg-icons";
import {SaveButton} from "../../../components/ColorButton/SaveButton";
import {CancelButton} from "../../../components/ColorButton/CancelButton";

const AddUrlDialog = (props) => {
    const {title, open} = props;
    const [url, setUrl] = useState({url: '', region: ''});
    const handleClose = () => {
        props.handleClose ? props.handleClose() : undefined;
    }
    const handleConfirm = () => {
        props.handleConfirm ? props.handleConfirm(url) : undefined
    }

    const handleChangeUrl = (e) => {
        setUrl({...url, [e.target.name]: e.target.value});
    }

    return (
        <CustomMUIDialog handleClose={props.handleClose} title={title} open={open}>
            <div style={{display: 'grid'}}>
                <TextField
                    style={{width: "500px", marginBottom: 10}}
                    variant="outlined"
                    size="small"
                    name='url'
                    label='آدرس نقشه'
                    value={url.url}
                    onChange={handleChangeUrl}
                />
                <TextField
                    style={{width: "500px"}}
                    variant="outlined"
                    size="small"
                    name='region'
                    label='نام امور'
                    value={url.region}
                    onChange={handleChangeUrl}
                />
            </div>
            <div style={{display: "flex", marginTop: 20, justifyContent: "space-evenly"}}>
                <SaveButton sx={{width: 180, fontSize: 14, fontWeight: 'bold'}}
                            onClick={handleConfirm}
                            variant="contained">
                    <FontAwesomeIcon
                        style={{marginLeft: 10}}
                        color="white"
                        icon={faFloppyDisk}/>
                    ثبت
                </SaveButton>
                <CancelButton sx={{width: 180, fontSize: 14, fontWeight: 'bold'}}
                              onClick={handleClose}
                              variant="contained">
                    <FontAwesomeIcon
                        style={{marginLeft: 10}}
                        color="white"
                        icon={faXmark}/>
                    انصراف
                </CancelButton>
            </div>

        </CustomMUIDialog>
    );
};

export default AddUrlDialog;
