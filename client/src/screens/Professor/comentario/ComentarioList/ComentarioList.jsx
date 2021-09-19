import { Box, Container } from '@material-ui/core';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import ComentarioListResult from '../../../../components/professor/ComentarioListResult/ComentarioListResult';
import CursosTabsSlug from '../../../../components/professor/CursosTabsSlug/CursosTabsSlug';
import ToolbarPage from '../../../../components/professor/ToolbarPage/ToolbarPage';

function ComentarioList() {

    const btns = [];

    const [currentCurso, setCurrentCurso] = useState(null)
    const [currentSlug, setCurrentSlug] = useState(null)
  
    const handleChangeSlug = (newValue) => {
        if(typeof newValue === 'object'){
            setCurrentSlug(newValue.target.value);
            setCurrentCurso(newValue.target.value)
        } else {
            setCurrentSlug(newValue);
            setCurrentCurso(newValue)
        }
        
      };
  
    const links = [
      {
        href: "/professor/app/dashboard",
        name: "Dashboard",
      },
      {
        href: "/professor/app/comentarios",
        name: "Comentários",
      },
    ];

    return (
      <>
        <Helmet>
          <title>Comentários | mscursos</title>
        </Helmet>
        <Box
          style={{
            backgroundColor: "inherit",
            minHeight: "100%",
            padding: "3rem 0",
          }}
        >
          <Container maxWidth={false}>
            <ToolbarPage title={"Comentários"} links={links} btns={btns} />
            <Box style={{ padding: "1rem 0" }}>
              <CursosTabsSlug  currentSlug={currentSlug} handleChangeSlug={handleChangeSlug} />
              <ComentarioListResult currentCurso={currentCurso} />
            </Box>
          </Container>
        </Box>
      </>
    );
}

export default ComentarioList
