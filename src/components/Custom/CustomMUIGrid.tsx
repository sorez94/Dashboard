import React from 'react';
import {createTheme, ThemeProvider, useTheme} from "@mui/material/styles";
import {DataGrid, faIR} from "@mui/x-data-grid";
import {styled} from "@mui/material";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";

const CustomMUIGrid = (props) => {
    const existingTheme = useTheme();
    const theme = createTheme(existingTheme, faIR, {
        direction: props.dir ? props.dir : 'rtl',
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    row: {
                        "&.Mui-selected": {
                            backgroundColor: "#c9c8c8",
                            color: "black",
                            fontWeight: 'bold',
                            "&:hover": {
                                backgroundColor: "#c9c8c8"
                            }
                        }
                    }
                }
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        color: 'white',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'black', // Change Paper background color
                        color: 'black',               // Change Paper text color
                        zIndex: '1',                  // Ensure Paper appears above other elements
                    },
                },
            },
            MuiList: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#515151', // Change List background color
                        color: 'white',                // Change List text color
                    },
                },
            },
        },
    });
    const StripedDataGrid = styled(DataGrid)(({theme}) => ({
        "& ::-webkit-scrollbar": {
            width: "9px"
        },
        "& ::-webkit-scrollbar-track": {
            backgroundColor: "#fcf9f9"
        },
        "& ::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
            backgroundColor: "#8c8a8a"
        }
    }));

    return (
        <div style={{height: 520, marginTop: 5, width: '100%'}}>
            <ThemeProvider theme={theme}>
                <StripedDataGrid
                    loading={props.loading}
                    sx={{
                        width: props.width ? props.width : 700,
                        border: 0.2,
                        borderColor: 'rgb(175,174,174)',
                        color: 'black',
                        boxShadow: 2,
                        '& .MuiDataGrid-cell:hover': {
                            fontWeight: 'bold',
                            color: '#000',
                            backgroundColor:'#c9c8c8'
                        },
                        "&.MuiDataGrid-cellContent": {
                            fontSize: 12
                        },
                        '& .MuiTablePagination-displayedRows': {
                            color: 'black'
                        },
                        '& .MuiTablePagination-selectLabel': {
                            color: 'black'
                        },
                        '& .MuiInputBase-root': {
                            color: 'black'
                        },
                        '& .MuiButtonBase-root': {
                            color: 'black'
                        },
                    }}
                    rowHeight={30}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    rows={props.data}
                    columns={props.columns}
                    getRowId={(row) => row.Id}
                    {...props}
                />
            </ThemeProvider>
        </div>
    );
};
export default CustomMUIGrid;
