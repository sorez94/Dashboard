import React from 'react';
import {Dialog, DialogContent, DialogTitle, IconButton} from "@mui/material";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const CustomMuiDialog = (props) => {
    const {open, title} = props;
    const handleClose = () => {
        props.handleClose ? props.handleClose() : undefined;
    }
    return (
        <Dialog
            fullWidth={false}
            maxWidth={"xl"}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle style={{color:'white'}}
                         sx={{m: 0, p: 2 , fontSize: 16, fontWeight: 'bold',color: 'black',
                             background: props.color ? props.color : 'linear-gradient(195deg,#1058b8, #49a3f1)'}}
                         id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <CustomFontAwesomeIcon icon={faXmark} color={'white'}/>
            </IconButton>
            <DialogContent sx={{background:'white'}} dividers>
                {props.children}
            </DialogContent>
        </Dialog>
    );
};

export default CustomMuiDialog;
