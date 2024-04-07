import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {green, yellow} from "@mui/material/colors";

export const CheckButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(yellow[900]),
    widths: '120px',
    backgroundColor: yellow[900],
    '&:hover': {
        backgroundColor: yellow[800],
    },
}));
