import React, {useState} from 'react'
import styled from 'styled-components'
import {motion} from 'framer-motion'
import { RiAddCircleLine} from 'react-icons/ri'

const DeleteModal = () => {

    const [modal, setModal] = useState(false);


    ///
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
        {/* <AddTask
            whileHover={{scale: 1.1 }}
            whileTap={{scale: 0.9 }}
        > */}
            <AddTask onClick={toggleModal} className="btn-modal"/>
        {/* </AddTask> */}

        {modal && (
            <ModalDiv className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Remove A User</h2>
                    
                    <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                    </button>
                </div>
            </ModalDiv>
        )}
        </>
    );
}

const AddTask = styled(RiAddCircleLine)`
    font-size: 70px;
    cursor: pointer;
`

const ModalButton = styled.button`
    padding: 10px 20px;
    display: block;
    /* margin: 100px auto 0; */
    font-size: 18px;
`

const ModalDiv = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 4;

    .overlay {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(49,49,49,0.8);
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        background: #f1f1f1;
        padding: 14px 28px;
        border-radius: 3px;
        // max-width: 600px;
        // min-width: 300px;
        width: fit-content;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 7px;
    }
`

const FormMotion = styled(motion.form)`
    // display:flex;
    .assign-div {
        margin-left: 20px;
    }
    .combine-div {
        display: flex;
    }
`

const InputMotion = styled(motion.input)`
    width: 309px;
    // height: 30px;
    font-size: 24px;
`

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const DivDesc = styled.div`
    display: flex;
    margin-top: 10px;
`

const InputDesc = styled.textarea`
    width: 309px;
    // line-height: 5em;
    font-size: 24px;
`

const CreateDiv = styled(motion.div)`
    flex-direction: column;
    display:flex;
    width: fit-content;
    margin-bottom: 20px;
    font-size: 25px;
    height: fit-content;
    // border-radius: 10px;
    // padding: 10px 10px;
    // box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    // background: rgb(248 248 248 / 100%);
`

export default DeleteModal
