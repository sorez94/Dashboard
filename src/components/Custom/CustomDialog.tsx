import {ActionsLayout, Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Button} from "@mui/material";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import CustomFontAwesomeIcon from "./CustomFontAwesomeIcon";
import {makeStyles} from "@mui/styles";

export enum CustomDialogSize {
    xs = 10,
    sm = 25,
    md = 50,
    lg = 75,
    xlg = 90,
    full = 100
}

export type CustomDialogType = {
    open?: boolean,
    handleClose?: Function,
    title?: any,
    children?: any,
    actions?: any,
    cancelButton?: boolean,
    handleConfirm?: Function,
    cancelText?: string,
    width?: CustomDialogSize | string,
    height?: CustomDialogSize | string,
    maxHeight?: CustomDialogSize | string,
    actionBarLayout?: ActionsLayout
}

const CustomDialog = (props: CustomDialogType) => {

    const width = props.width ? typeof props.width === 'string' ? props.width : `${props.width}%` : `${CustomDialogSize.sm}%`;
    const height = props.height ? typeof props.height === 'string' ? props.height : `${props.height}%` : 'auto';
    const maxHeight = props.maxHeight ? typeof props.maxHeight === 'string' ? props.maxHeight : `${props.maxHeight}%` : 'auto';
    const useStyles: any = makeStyles(() => ({
        dialog: {
            zIndex: '1000000 !important',
            "& .k-dialog": {
                width: width,
                height: height,
                maxHeight: maxHeight
            },
            "& .k-dialog-title": {
                fontSize: 16,
                fontWeight: "bold"
            }
        },
    }));

    const classes = useStyles();
    const handleClose = () => {
        props.handleClose ? props.handleClose() : undefined;
    }
    if (!props.open) return null;

    return (
        <Dialog style={{zIndex: '1000000000 !important'}} title={props.title} onClose={handleClose} className={classes.dialog}>
            {props.children}
            {
                props.actions ?
                    <DialogActionsBar layout={props.actionBarLayout}>
                        {
                            props.cancelButton ?
                                <Button variant='contained' onClick={handleClose}
                                        startIcon={!props.cancelText ? <CustomFontAwesomeIcon icon={faXmark}/> : ""}>
                                    {
                                        props.cancelText ? props.cancelText : 'لغو'
                                    }
                                </Button> : ""
                        }
                        {props.actions}
                    </DialogActionsBar> : ""
            }
        </Dialog>
    );
}

export default CustomDialog;
