import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { MRT_ColumnDef, MRT_TableBodyCellValue, useMaterialReactTable } from "material-react-table";
import { 
    flexRender,
} from "@tanstack/react-table";
import Box from "components/layout/Box";
import { useEffect, useState } from "react";
import { Product } from "types/data";

// type TableHeader = {
//     accessorKey: string
//     header: string
// }

const columns: MRT_ColumnDef<Product>[] = [
    {
        accessorKey: 'id',
        header: '商品ID',
    },
    {
        accessorKey: 'title',
        header: '商品名',
    },
    {
        accessorKey: 'price',
        header: '商品価格',
    },
    {
        accessorKey: 'description',
        header: '商品詳細',
    },
];

// const columns = [
//     {
//         accessorKey: 'id',
//         header: '商品ID'
//     },
//     {
//         accessorKey: 'title',
//         header: '商品名'
//     },
//     {
//         accessorKey: 'price',
//         header: '商品価格'
//     },
//     {
//         accessorKey: 'description',
//         header: '商品詳細'
//     }
// ]

const ProductTableContainer = (data: any) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    console.log(data.data)

    const table = useMaterialReactTable({
        columns,
        data: data.data,
        initialState: {
        pagination: { pageSize: 5, pageIndex: 0 },
        showGlobalFilter: true,
        },
        //customize the MRT components
        muiPaginationProps: {
        rowsPerPageOptions: [5, 10, 15],
        variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
    });
    
    if (!isClient) return

    console.log(table)
    return (
        <Stack>
            <Box>
                <Typography variant="h4">Product List</Typography>
                <h4>商品一覧</h4>
                <TableContainer>
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell key={header.id} align="center" variant="head">
                                            {header.isPlaceholder
                                            ? null
                                            :flexRender(
                                                header.column.columnDef.Header ??
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>

                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} selected={row.getIsSelected()}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell align="center" variant="body" key={cell.id}>
                                            <MRT_TableBodyCellValue cell={cell} table={table} />
                                                {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
    )
}

export default ProductTableContainer