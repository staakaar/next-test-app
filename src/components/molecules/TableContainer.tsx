"use client";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { 
    flexRender,
} from "@tanstack/react-table";
// import Box from "components/layout/Box";
import { Key, forwardRef, useEffect, useState } from "react";
import { Product } from "types/data";
import { useDrawer } from "utils/hooks";
import Drawer from "./Drawer";

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface TableContainerProps {
    product: any
    updateProduct: (row: any) => void
}

const ProductTableContainer = (products: any, updateProduct: any) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    /** 新規作成ボタン */
    const { isOpen, onOpen, onClose } = useDrawer();
    // const [isClient, setIsClient] = useState(false)

    // useEffect(() => {
    //     setIsClient(true)
    // }, [])

    console.log(products)
    
    // if (!isClient) return

    /** TODO: 関数を渡すことができないためContextで実装 */
    // const openDrawer = (event: any, row: MRT_Row<Product>) => {
    //     updateProduct(row.getValue);
    // }

    return (
        <Stack>
            <Box sx={{ margin: '20px', marginTop: '30px' }}>
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between', 
                    margin: '5px'
                }}>
                    <Typography variant="h4">商品一覧</Typography>
                    <Button
                        variant="contained"
                        onClick={onOpen}
                        aria-expanded={isOpen}
                        className="bg-sky-500/100"
                        size="large"
                    >
                        新規作成
                    </Button>
                </Box>
                <Drawer isOpen={isOpen} onClose={onClose}>
                    {/* 詳細ページを埋め込む */}
                </Drawer>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product: { [x: string]: any; code: Key | null | undefined; }) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={product.code}>
                                    {columns.map((column) => {
                                    const value = product[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>
                                    );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Stack>
    )
}

export default ProductTableContainer