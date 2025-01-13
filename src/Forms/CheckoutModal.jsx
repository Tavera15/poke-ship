import React, {useState} from "react";
import { Navbar, Modal, Container, Button } from "react-bootstrap";
import CheckoutForm from "./CheckoutForm";

function CheckoutModal()
{
    const [showCheckout, setShowCheckout] = useState(false);

    return(
        <Navbar bg="dark" data-bs-theme="dark" fixed="bottom">
            <Modal
                show={showCheckout}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={() => setShowCheckout(false)}
                className='text-light'
                >
                <Modal.Header closeButton={true} className='bg-dark'>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Checkout
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark'>
                    <CheckoutForm handleClose={() => setShowCheckout(false)}/>
                </Modal.Body>
            </Modal>
            <Container className='d-flex justify-content-center p-2'>
                <Button variant='warning' onClick={() => setShowCheckout(true)} className='btn-lg'>Checkout</Button>
            </Container>
        </Navbar>
    );
}

export default CheckoutModal;