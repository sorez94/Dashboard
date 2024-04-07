import * as React from 'react';
import {
    GridColumnMenuFilter,
    GridColumnMenuCheckboxFilter,
    GridColumnMenuProps
} from '@progress/kendo-react-grid';

const products = [{
    "ProductID" : 1,
    "ProductName" : "Chai",
    "SupplierID" : 1,
    "CategoryID" : 1,
    "QuantityPerUnit" : "10 boxes x 20 bags",
    "UnitPrice" : 18.0000,
    "UnitsInStock" : 39,
    "UnitsOnOrder" : 0,
    "ReorderLevel" : 10,
    "Discontinued" : false,
    "Category" : {
        "CategoryID" : 1,
        "CategoryName" : "Beverages",
        "Description" : "Soft drinks, coffees, teas, beers, and ales"
    }
}, {
    "ProductID" : 2,
    "ProductName" : "Chang",
    "SupplierID" : 1,
    "CategoryID" : 1,
    "QuantityPerUnit" : "24 - 12 oz bottles",
    "UnitPrice" : 19.0000,
    "UnitsInStock" : 17,
    "UnitsOnOrder" : 40,
    "ReorderLevel" : 25,
    "Discontinued" : false,
    "Category" : {
        "CategoryID" : 1,
        "CategoryName" : "Beverages",
        "Description" : "Soft drinks, coffees, teas, beers, and ales"
    }
}, {
    "ProductID" : 3,
    "ProductName" : "Aniseed Syrup",
    "SupplierID" : 1,
    "CategoryID" : 2,
    "QuantityPerUnit" : "12 - 550 ml bottles",
    "UnitPrice" : 10.0000,
    "UnitsInStock" : 13,
    "UnitsOnOrder" : 70,
    "ReorderLevel" : 25,
    "Discontinued" : false,
    "Category" : {
        "CategoryID" : 2,
        "CategoryName" : "Condiments",
        "Description" : "Sweet and savory sauces, relishes, spreads, and seasonings"
    }
}];

export const ColumnMenu = (props: GridColumnMenuProps) => {
    return (
        <div>
            <GridColumnMenuFilter {...props} expanded={true} />
        </div>
    );
}

export const ColumnMenuCheckboxFilter = (props: GridColumnMenuProps) => {
    return (
        <div>
            <GridColumnMenuCheckboxFilter {...props} data={products} expanded={true} />
        </div>
    );
}