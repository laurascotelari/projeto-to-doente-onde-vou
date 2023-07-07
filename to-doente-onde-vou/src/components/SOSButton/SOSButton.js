import { useState } from 'react';
import "./SOSButton.css";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function SOSButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
        <button className='SOS-button' onClick={handleShow}> SOS </button>

        <Modal show={show} onHide={handleClose} animation={true}>

          <Modal.Header closeButton>
            <h1 className='emergency-title'>Orientações</h1>
          </Modal.Header>

          <Modal.Body>
            <div className='emergency-text-container'>
                <h1 className='emergency-text'>Ligue para o número 192</h1>

            </div>

            <h2 className='emergency-steps'>1 - Diga seu endereço atual ou um ponto de referência</h2>

            <h2 className='emergency-steps'>2 - Descreva o que está sentindo</h2>

            <h2 className='emergency-steps'>3 - Diga o seu nome</h2>

          </Modal.Body>

          <Modal.Footer>

            <Button className="emergency-ok-button" onClick={handleClose}>
              Fechar
            </Button>

          </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SOSButton