"use client";
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Key, forwardRef, useEffect, useState } from "react";
import { useDrawer } from "utils/hooks";
import Drawer from "./Drawer";

interface Column {
    id: 'id' | 'title' | 'description' | 'category' | 'price' | 'owner';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'id', label: 'id', minWidth: 50 },
    { id: 'title', label: 'title', minWidth: 100 },
    {
        id: 'description',
        label: 'description',
        minWidth: 200,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'category',
        label: 'category',
        minWidth: 100,
        align: 'left',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 100,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'owner',
        label: 'owner',
        minWidth: 100,
        align: 'left',
        format: (value: number) => value.toFixed(2),
    },
];

interface TableContainerProps {
    product: any
    updateProduct: (row: any) => void
}

const ProductTableContainer = (products: any) => {
    /** storeで管理 */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rowClick = (product: { [x: string]: any; code: Key | null | undefined; }) => {
        console.log(product)
        debugger
    }

    /** 新規作成ボタン */
    const { isOpen, onOpen, onClose } = useDrawer();

    return (
        <Stack mt={6}>
            <Box sx={{ margin: '20px', marginTop: '30px' }}>
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between', 
                    margin: '5px',
                    marginBottom: '20px'
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
                <TableContainer sx={{ maxHeight: 440, border: '1px solid rgba(210, 215, 211, 1)', borderRadius: 2, borderColor: 'grey' }}>
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
                            {products.data.products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product: { [x: string]: any; code: Key | null | undefined; }) => {
                                return (
                                <TableRow hover={true} selected role="checkbox" tabIndex={-1} key={product.code} onClick={rowClick(product)}>
                                    {columns.map((column) => {
                                    const value = product[column.id];
                                    return (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            className={column.label == 'description' ? 'whitespace-nowrap text-ellipsis overflow-hidden' : ''}
                                            style={{maxWidth: column.minWidth}}
                                        >
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : column.label === 'owner' ? value.username : value}
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
                    count={products.data.products.length}
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