import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {blue, green} from "@mui/material/colors";

export const SaveButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[900]),
    widths: '120px',
    backgroundColor: blue[900],
    '&:hover': {
        backgroundColor: blue[800],
    },
}));
