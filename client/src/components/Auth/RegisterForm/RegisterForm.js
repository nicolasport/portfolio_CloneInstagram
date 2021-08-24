import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import {useFormik} from "formik"
import * as Yup from "yup"
import { useMutation } from '@apollo/client';
import { REGISTER } from "../../../gql/user"
import "./RegisterForm.scss"
import {toast} from "react-toastify"

export default function RegisterForm(props) {
    const {setShowLogin} = props
    const [register]   = useMutation(REGISTER)
    console.log("MMMMMM", register)
    
    //Initial values for formik
    const initialValues = {
        name: "",
        username: "",
        email: "",
        password: "",
        repeatPassword: ""}

    const formik = useFormik({
        initialValues, //before initialized
        validationSchema : Yup.object({
            name: Yup.string().required("Tu nombre es obligatorio"),
            username: Yup.string().matches(/^[a-zA-z0-9-]*$/,"El nombre del usuario no puede tner espacio").required("El nombre de usuario es obligatorio"),
            email: Yup.string().email("El email no es valido").required("El email es requerido"),
            password: Yup.string()
                .required("Contraseña obligatoria")
                .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no coinciden"),
            repeatPassword: Yup.string()
                .required("Contraseña obligatoria")
                .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")

        }),
        onSubmit: async (formData) => {
            try{
                const newUser = formData
                delete newUser.repeatPassword

                const result = await register({
                    variables: {
                        input: newUser
                    },
                });
                toast.success("Usuario registrado correctamente")
                setShowLogin(true)

                
            }catch(error){
                toast.error(error.message)
            }
        },
    })
    
    return (
        <>
            <h2 className="register-form-title">Registrate para ver fotos y videos de tus amigos</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input tpye="text" 
                    placeholder="Nombre y Apellido" 
                    name="name" 
                    value={formik.values.name} 
                    onChange={formik.handleChange}
                    error={formik.errors.name}
                />
                <Form.Input 
                    tpye="text" 
                    placeholder="Nombre de usuario" 
                    name="username" 
                    value={formik.values.username} 
                    onChange={formik.handleChange}
                    error={formik.errors.username}
                />
                <Form.Input 
                    tpye="text" 
                    placeholder="Email" 
                    name="email" 
                    value={formik.values.email}  
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                />
                <Form.Input 
                    tpye="password" 
                    placeholder="Contraseña" 
                    name="password" 
                    value={formik.values.password}  
                    onChange={formik.handleChange}
                    error={formik.errors.password}
                />
                <Form.Input tpye="password" placeholder="Repetir contraseña" 
                    name="repeatPassword" 
                    value={formik.values.repeatPassword}  
                    onChange={formik.handleChange}
                    error={formik.errors.repeatPassword && true}
                />

                <Button 
                    type="submit" 
                    className="btn-submit"
                >
                    Registrarse
                </Button>
                {/*  Reset datos con Boton
                <Button 
                    type="button" 
                    className="btn-submit" 
                    onClick={formik.handleReset}
                >
                    Clear data
                </Button>
                */}
            </Form>
        </>
    );
}