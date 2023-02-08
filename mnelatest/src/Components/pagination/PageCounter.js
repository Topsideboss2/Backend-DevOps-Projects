import { useState } from "react";
import usePagination from "../../Utils/Hooks/usePagination";

export const PagesCount=(array)=>{
    const [rowsPerPage, setRowsPerPage] = useState(10);
    return Math.ceil( 
        array.length / rowsPerPage
     );
}

export const HandlePagination=(array , rowsPerPage)=>{
    const data=usePagination( array , rowsPerPage)
    return(
        data.currentData( array)
    )
}

