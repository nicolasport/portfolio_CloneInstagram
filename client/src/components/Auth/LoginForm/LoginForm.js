import React, {useState} from 'react'
import {Form, Button, FormInput} from "semantic-ui-react"
import {useFormik} from "formik"
import * as Yup from "yup"
import "./LoginForm.scss"
import { useMutation } from '@apollo/client'
import { LOGIN } from "../../../gql/user"
import {setToken, decodeToken} from "../../../utils/token"
import userAuth from '../../../hooks/userAuth'



//test
export default function LoginForm() {
    const [login] = useMutation(LOGIN)
    const [error, setError] = useState("")

    const {setUser} = userAuth()


    const initialValues = {
        email: "",
        password: ""
    }
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            email: Yup.string()
                .email("El email no es valido")
                .required("El campo es obligatorio"),
            password: Yup.string()
                .required("El campo es obligatorio")
        }),
        onSubmit: async (formData) => {
            try{
                setError("")
                const result = await login({
                    variables:{
                        input: formData
                    }
                })
                
                const { token } = result.data.login
                setToken(token)
                setUser(decodeToken(token))
                console.log(token)
            }catch(error){
                setError(error.message)

            }
            
        }
    })
    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Entra para ver fotos y videos de tus amigos</h2>
            <FormInput 
                type="text"
                placeholder="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <FormInput
                type="text"
                placeholder="Constrañesa"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <Button type="submit" className="btn-submit">
                Iniciar Sesion
            </Button>
            {error && <p className="submit-error">{error}</p>}
        </Form>
    )
}
