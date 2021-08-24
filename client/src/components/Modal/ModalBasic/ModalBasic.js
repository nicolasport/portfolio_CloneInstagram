import React from 'react'
import './ModalBasic.scss'
import {Modal} from "semantic-ui-react"

export default function ModalBasic(props) {
    const {show, setShow, title, children} = props

    const onClose = () => {
        setShow(false)
    }
    return (
        <Modal size="mini" open={show} onClose={onClose} className="modal-basic">
            {title && <Modal.Header>{title}</Modal.Header>}
            {children}
        </Modal>
    )
}