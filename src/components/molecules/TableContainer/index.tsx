import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Box from "components/layout/Box";
import { Product } from "types/data";

// type TableHeader = {
//     accessorKey: string
//     header: string
// }

interface ProductTableProps {
    data: Product[],
    columns: ColumnDef<Product>[]
}

const columns = [
    {
        accessorKey: 'id',
        header: '商品ID'
    },
    {
        accessorKey: 'productName',
        header: '商品名'
    },
    {
        accessorKey: 'productPrice',
        header: '商品価格'
    },
    {
        accessorKey: 'productDetail',
        header: '商品詳細'
    }
]

const ProductTableContainer = ({ data, columns }: ProductTableProps) => {
    const options = {
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel()
    }

    const table = useReactTable(options)
    
    return (
        <Box>
            <h1>商品一覧</h1>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
            </table>
        </Box>
    )
}

export default ProductTableContainer