import React, {useCallback} from 'react'
import './AvatarForm.scss'
import { Button } from 'semantic-ui-react'
import {useDropzone} from "react-dropzone"
import {useMutation} from "@apollo/client"
import { UPDATE_AVATAR } from "gql/user"

export default function AvatarForm(props) {
    const {setShowModal} = props

    const [updateAvatar] = useMutation(UPDATE_AVATAR)
    

    const onDrop = useCallback(async (acceptedFile) =>{
        /*
        console.log(acceptedFile)
        [File]
        0: File {
            path: "user1 (1).jpg", 
            name: "user1 (1).jpg", 
            lastModified: 1625382023057, 
            lastModifiedDate: Sun Jul 04 2021 04:00:23 GMT-0300 (hora estándar de Argentina), 
            webkitRelativePath: "", …}
        length: 1
        */

        const file = acceptedFile[0];

        try {
            const result = await updateAvatar({
                variables: {file}
            })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop
    })
    return (
        <div className="avatar-form">
            <Button {...getRootProps()} >Cargar una foto</Button>
            <Button>Eliminar foto actual</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
            <input {...getInputProps()} />
        </div>
    )
}