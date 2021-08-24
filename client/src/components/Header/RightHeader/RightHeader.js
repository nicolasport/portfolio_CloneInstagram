import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Image } from 'semantic-ui-react'
import useAuth from "../../../hooks/userAuth"
import ImageNoFound from "../../../assets/png/avatar.png"
import "./RightHeader.scss"

export default function RightHeader() {
    const {auth} = useAuth()
    console.log(auth)
    return (
        <div className="right-header">
            <Link to="">
                <Icon name="home" />
            </Link>
            <Icon name="plus" />
            <Link to={`/${auth.username}`}>
                <Image src={ImageNoFound} avatar />
            </Link>
        </div>
    )
}
