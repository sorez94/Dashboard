import React, {useState} from 'react';
import CustomMUIDialog from "../../../components/Custom/CustomMUIDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {CancelButton} from "../../../components/ColorButton/CancelButton";
import {Typography} from "@mui/joy";
import {DeleteButton} from "../../../components/ColorButton/DeleteButton";

const DeleteUrlDialog = (props) => {
    const {title, open} = props;
    const handleClose = () => {
        props.handleClose ? props.handleClose() : undefined;
    }
    const handleConfirm = () => {
        props.handleConfirm ? props.handleConfirm(props?.selectedData?.Id) : undefined
    }


    return (
        <CustomMUIDialog color={'linear-gradient(195deg,#a72323, #e31b1b)'} handleClose={props.handleClose}
                         title={title} open={open}>
            <>
                <Typography width={550}>از حذف url اطمینان دارید </Typography>
            </>
            <div style={{display: "flex", marginTop: 20, justifyContent: "space-evenly"}}>
                <DeleteButton sx={{width: 180, fontSize: 14, fontWeight: 'bold'}}
                              onClick={handleConfirm}
                              variant="contained">
                    <FontAwesomeIcon
                        style={{marginLeft: 10}}
                        color="white"
                        icon={faTrash}/>
                    حذف
                </DeleteButton>
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

export default DeleteUrlDialog;
