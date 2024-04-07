import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {green, red} from "@mui/material/colors";

export const DeleteButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[900]),
    widths: '120px',
    backgroundColor: red[900],
    '&:hover': {
        backgroundColor: red[800],
    },
}));
