import { Box, Card, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PerfectScrollbar  from 'react-perfect-scrollbar'
import MenuButton from '../MenuButton/MenuButton'

function CursoListResults({cursos, ...rest}) {
    const [limit, setLimit] = useState(10)
    const [page,setPage] = useState(0)
    

    const handleLimitChange = (event) =>{
        setLimit(event.target.value)
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar component="div">
                <Box style={{minWidth: '1050px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Id
                                </TableCell>
                                <TableCell>
                                    Nome
                                </TableCell>
                                <TableCell>
                                    Descrição
                                </TableCell>
                                <TableCell>
                                    categoria
                                </TableCell>
                                <TableCell>
                                    Aulas
                                </TableCell>
                                <TableCell>
                                    Alunos
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cursos.slice(page * limit, page * limit + limit).map((curso) =>(
                                <TableRow
                                    hover
                                    key={curso.curso_id}
                                >
                                    <TableCell >
                                        {curso.curso_id}
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {curso.nome}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {curso.descricao}
                                    </TableCell>
                                    <TableCell>
                                        {curso.categoria_nome}
                                    </TableCell>
                                    <TableCell>
                                        {curso.aulas}
                                    </TableCell>
                                    <TableCell>
                                        {curso.alunos}
                                    </TableCell>
                                    <TableCell>
                                        {curso.alunos}
                                    </TableCell>
                                    <TableCell>
                                        <MenuButton 
                                            id={curso.curso_id}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination 
                component="div"
                count={cursos.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5,10,25]}
            />

        </Card>
    )
}

export default CursoListResults
