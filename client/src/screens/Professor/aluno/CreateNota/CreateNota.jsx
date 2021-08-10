import { Box, Container } from '@material-ui/core';
import React from 'react'
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CreateFormNota from '../../../../components/professor/FormNota/CreateFormNota/CreateFormNota';
import ToolbarPage from '../../../../components/professor/ToolbarPage/ToolbarPage';

function CreateNota() {
  
    const history = useHistory()
    
    const links = [
      {
        name: "dashboard",
        href: "/professor/app/dashboard",
      },
      {
        name: "Aulas",
        href: "/professor/app/alunos",
      },
      {
        name: "Nova nota",
        href: "/professor/app/nota/novo",
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
          <title>Nova nota | mscursos</title>
        </Helmet>
        <Box
          style={{
            backgroundColor: "inherit",
            minHeight: "100%",
            padding: "3rem 0",
          }}
        >
          <Container maxWidth={false}>
            <ToolbarPage title={"Nova nota"} links={links} btns={btns} />
            <Box style={{ padding: "3rem 0" }}>
              <CreateFormNota />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
  
export default CreateNota
