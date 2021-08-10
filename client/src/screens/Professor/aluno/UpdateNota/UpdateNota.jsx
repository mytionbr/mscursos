import { Box, Container } from '@material-ui/core';
import React from 'react'
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UpdateFormNota from '../../../../components/professor/FormNota/UpdateFormNota/UpdateFormNota';
import ToolbarPage from '../../../../components/professor/ToolbarPage/ToolbarPage';

function UpdateNota(props) {
    const notaId = props.match.params.notaId;
    const cursoId = props.match.params.cursoId
    
    const history = useHistory()
  
    const links = [
      {
        name: "dashboard",
        href: "/professor/app/dashboard",
      },
      {
        name: "Alunos",
        href: "/professor/app/alunos",
      },
      {
        name: "Nota",
        href: `/professor/app/cursos/${cursoId}/notas/${notaId}`,
      },
    ];
  
    const btns = [
      {
        name: "Voltar",
        action: ()=> history.push('/professor/app/alunos')
      },
    ];
  
    return (
      <>
        <Helmet>
          <title>Nota | mscursos</title>
        </Helmet>
        <Box
          style={{
            backgroundColor: "inherit",
            minHeight: "100%",
            padding: "3rem 0",
          }}
        >
          <Container maxWidth={false}>
            <ToolbarPage title={"Nota"} links={links} btns={btns} />
            <Box style={{ padding: "3rem 0" }}>
              <UpdateFormNota cursoId={cursoId} notaId={notaId} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }

export default UpdateNota
