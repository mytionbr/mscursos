import { Box, Container } from '@material-ui/core';
import React, { useState } from 'react'
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AlunoListResult from '../../../../components/professor/alunoList/AlunoListResult/AlunoListResult';
import FormAlunoFilter from '../../../../components/professor/alunoList/FormAlunoFilter/FormAlunoFilter';
import CursosTabs from '../../../../components/professor/CursosTabs/CursosTabs';
import ModalFilter from '../../../../components/professor/ModalFilter/ModalFilter';
import ToolbarPage from '../../../../components/professor/ToolbarPage/ToolbarPage';

function AlunoList() {
    const history = useHistory();
  
  const [openModal, setOpenModal] = useState(false);
  const [currentCurso, setCurrentCurso] = useState(null)

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleChangeCurso = (newValue) => {
    if(typeof newValue === 'object'){
      setCurrentCurso(newValue.target.value);
    } else {
      setCurrentCurso(newValue);
    }
    
  };

  const links = [
    {
      href: "/professor/app/dashboard",
      name: "Dashboard",
    },
    {
      href: "/professor/app/alunos",
      name: "Alunos",
    },
  ];

  const btns = [
    {
      name: "Avalie um aluno",
      action: () => history.push("/professor/app/notas/novo"),
    },
    {
      name: "Filtrar",
      action: handleOpenModal,
    },
  ];

  const filter = <FormAlunoFilter onModalClose={handleOpenModal} currentCurso={currentCurso} />

  return (
    <>
      <Helmet>
        <title>Alunos | mscursos</title>
      </Helmet>
      <Box
        style={{
          backgroundColor: "inherit",
          minHeight: "100%",
          padding: "3rem 0",
        }}
      >
        <Container maxWidth={false}>
          <ToolbarPage title={"Alunos"} links={links} btns={btns} />
          <Box style={{ padding: "1rem 0" }}>
            <CursosTabs currentCurso={currentCurso} handleChangeCurso={handleChangeCurso} />
            <AlunoListResult currentCurso={currentCurso} />
          </Box>
        </Container>
      </Box>
      <ModalFilter
        openModal={openModal} 
        onModalClose={handleOpenModal} 
        form={filter} />
    </>
  );
}

export default AlunoList
