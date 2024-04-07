import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {green, red} from "@mui/material/colors";

export const CancelButton = styled(Button)(({ theme }) => ({
    color: '#fff',
    widths: '120px',
    backgroundColor: '#868686',
    '&:hover': {
        backgroundColor: '#5b5b5b',
    },
}));
