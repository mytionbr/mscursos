import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

function CursoListResults({cursos, ...rest}) {
    const [selectedCursoIds, setSelectedCursoIds] = useState([])
    const [limit, setLimit] = useState(10)
    const [page,setPage] = useState(0)
    
    const handleSelectAll = (event) => {
        let newSelectedCursosIds

        if (event.target.checked) {
            newSelectedCursosIds = cursos.map((curso) => curso.id)
        } else {
            newSelectedCursosIds = []
        }

        setSelectedCursoIds(newSelectedCursosIds)
    }

    const handleSelectOne = (event, id) =>{
        const selectedIndex = selectedCursoIds.indexOf(id)
        let newSelectedCursosIds = []

        if (selectedIndex === -1){
            newSelectedCursosIds = newSelectedCursosIds.concat(newSelectedCursosIds, id)
        } else if (selectedIndex === 0) {
            newSelectedCursosIds = newSelectedCursosIds.concat(selectedCursoIds.slice(1))
        } else if (selectedIndex === selectedCursoIds.length - 1){
            newSelectedCursosIds = newSelectedCursosIds.concat(selectedCursoIds.slide(0,-1))
        } else if (selectedCursoIds > 0 ){
            newSelectedCursosIds = newSelectedCursosIds.concat(
                selectedCursoIds.slice(0, selectedIndex),
                selectedCursoIds.slice(selectedIndex + 1)
            )
        }

        setSelectedCursoIds(newSelectedCursosIds)
    }

    const handleLimitChange = (event) =>{
        setLimit(event.target.value)
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage)
    }

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box style={{minWidth: 1050}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedCursoIds.length === cursos.length}
                                        color="primary"
                                        indeterminate={
                                            selectedCursoIds.length > 0
                                            && selectedCursoIds.length < cursos.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    Nome
                                </TableCell>
                                <TableCell>
                                    Descrição
                                </TableCell>
                                <TableCell>
                                    Aulas
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cursos.slice(0,limit).map((curso) =>(
                                <TableRow
                                    hover
                                    key={curso.id}
                                    selected={selectedCursoIds.indexOf(curso.id) !== -1}                                    
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox 
                                            checked={selectedCursoIds.indexOf(curso.id) !== -1}
                                            onChange={(event) => handleSelectOne(event,curso.id)}
                                            value="true"
                                        /> 
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
                                        {curso.Aulas}
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
