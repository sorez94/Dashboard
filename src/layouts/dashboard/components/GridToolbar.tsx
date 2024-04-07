import {useState} from "react";
import axios from "axios";
import serviceUrls from "../../../configuration/serviceUrls";
import CustomNotification from "../../../components/Custom/CustomNotification";
import {Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CustomFontAwesomeIcon from "../../../components/Custom/CustomFontAwesomeIcon";
import {faAdd, faTrash} from "@fortawesome/free-solid-svg-icons";
import AddUrlDialog from "./AddUrlDialog";
import DeleteUrlDialog from "./DeleteUrlDialog";

const GridToolbar = (props) => {
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleDeleteClick = () => {
        if (props.selectedData?.Id) {
            setOpenDeleteDialog(true)
        } else {
            CustomNotification.showToastWarning('رکوردی انتخاب نشده است!');
        }
    }
    const handleAddUrl = (data) => {
        axios.post(`${serviceUrls.urls.AddUrl}?name=${data.url}`
        ).then((response) => {
            if (response.status == 200) {
                CustomNotification.showToastSuccess('آدرس با موفقیت ذخیره شد');
                setOpenAddDialog(false);
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در ذخیره آدرس');
        }).finally(() => props.handleChangeStatus())
    }
    const handleDeleteUrl = (data) => {
        axios.delete(`${serviceUrls.urls.DeleteUrl}?urlId=${data}`
        ).then((response) => {
            if (response.status == 200) {
                CustomNotification.showToastSuccess('آدرس با موفقیت حذف شد');
                setOpenDeleteDialog(false);
            }
        }).catch(() => {
            CustomNotification.showToastError('خطا در حذف آدرس');
        }).finally(() => props.handleChangeStatus())
    }

    return (
        <>
            <div>
                <Typography textAlign='center' fontSize={17} fontWeight={'bold'} > لیست URL ها </Typography>
            </div>
            <Tooltip title="اضافه کردن">
                <IconButton aria-label="اضافه کردن" onClick={() => setOpenAddDialog(true)}>
                    <CustomFontAwesomeIcon
                        fontSize={16}
                        color="blue"
                        icon={faAdd}/>
                </IconButton>
            </Tooltip>
            <Tooltip title="حذف کردن">
                <IconButton aria-label="حذف کردن" onClick={handleDeleteClick}>
                    <CustomFontAwesomeIcon
                        fontSize={16}
                        color="red"
                        icon={faTrash}/>
                </IconButton>
            </Tooltip>
            <AddUrlDialog open={openAddDialog} handleConfirm={handleAddUrl} handleClose={() => setOpenAddDialog(false)}
                          title={'اضافه کردن url'}/>
            <DeleteUrlDialog open={openDeleteDialog} handleConfirm={handleDeleteUrl} title={'حذف url'} handleClose={() => setOpenDeleteDialog(false)}
                             selectedData={props.selectedData}/>
        </>
    );
}
export default GridToolbar;
