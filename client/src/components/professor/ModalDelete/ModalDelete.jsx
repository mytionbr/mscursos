import { Backdrop, Button, Fade, Modal } from '@material-ui/core'
import React from 'react'
import useStyles from './styles'

function ModalDelete({handleOpenModal, open,idDelete,setIdDelete, handleDelete}) {
    const classes = useStyles()
    
    const handleConfirm = () =>{
        handleDelete(idDelete)
        handleOpenModal()
    }
 
    const handleCancel = () => {
        handleOpenModal()
        setIdDelete(null)
    }
    
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleOpenModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Você quer confimar essa operação?</h2>
            <div className={classes.btns}>
                <Button
                     variant="contained"
                     onClick={handleConfirm}    
                >
                    Confimar
                </Button>
                <Button
                     variant="contained"
                     onClick={handleCancel}   
                >
                    Cancelar
                </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    )
}

export default ModalDelete
