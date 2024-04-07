import {Grid, IconButton, Paper, Tooltip, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {green} from "@mui/material/colors";
import DateTimeService from "../../../service/DateTimeService";
import styled from "@emotion/styled";
import CustomFontAwesomeIcon from "../../../components/Custom/CustomFontAwesomeIcon";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'right',
    display: 'flex',
    color: theme.palette.text.secondary,
}));

const LastRunItems = (props) => {
    const {col1, col2, col3, col4, col5, col6, onclick} = props;
    return (
        <Grid marginTop='50px' marginRight='40px' container spacing={2}>
            <Grid item xs={5.5}>
                <Item>
                    <Typography fontWeight='bold' fontSize={13}> {col1} </Typography>
                    <Typography fontSize={13}> {col2} </Typography>
                    <Tooltip title="جزئیات">
                        <IconButton aria-label="جزئیات" onClick={onclick} style={{marginRight: 10, padding: 0}}>
                            <CustomFontAwesomeIcon
                                style={{marginRight: 7}}
                                fontSize={14}
                                color={green[900]}
                                icon={faCircleInfo}/>
                        </IconButton>
                    </Tooltip>
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Typography fontWeight='bold' fontSize={13}> {col3} </Typography>
                    <Typography fontSize={13}> {col4 ? DateTimeService.toPersianDigitDateTime(col4) : ''} </Typography>
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    <Typography fontSize={13} fontWeight='bold'> {col5} </Typography>
                    <Typography fontSize={13}> {col6 ? DateTimeService.toPersianDigitDateTime(col6) : ''} </Typography>
                </Item>
            </Grid>
        </Grid>
    )
}
export default LastRunItems;
