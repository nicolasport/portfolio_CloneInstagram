import React, {useState} from 'react'
import {useQuery} from "@apollo/client"
import {GET_USER} from "gql/user"
import "./Profile.scss"
import { Grid, Image } from 'semantic-ui-react'
import ImageNoFound from '../../assets/png/avatar.png'
import UserNotFound from 'components/UserNotFound'
import ModalBasic from 'components/Modal/ModalBasic'
import AvatarForm from 'components/User/AvatarForm'
import userAuth from 'hooks/userAuth'


export default function Profile(props) {
    const [titleModal, setTitleModal] = useState("initialState")
    const [childrenModal, setChildrenModal] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const {username} = props
    const {data, loading, error} = useQuery(GET_USER, {
        variables: {username},
    })
    const { auth } = userAuth();
    
    if(loading) return null;
    if (error) return <UserNotFound />
    
    const {getUser} = data

    const handlerModal = (type) => {
        switch (type) {
            case "avatar":
                setTitleModal("Cambiar foto de perfil")
                setChildrenModal(<AvatarForm setShowModal={setShowModal}/>)
                setShowModal(true)
                break;

            default:
                break;
        }
    }
    console.log("username: ", username)
    console.log("auth: ", auth)
    return (
        <>
            <Grid className="profile">
                <Grid.Column width={5} className="profile__left">
                    <Image
                        src={ImageNoFound}
                        avatar
                        onClick={() => username === auth.username && handlerModal("avatar")}
                    />
                </Grid.Column>
                <Grid.Column width={11} className="profile__right">
                    <div>Header profile</div>
                    <div>Followers</div>
                    <div className="other">
                        <p className="name">{getUser.name}</p>
                        {getUser.siteWeb && (
                            <a href={getUser.siteWeb} className="siteWeb" target="_blank">
                                {getUser.siteWeb}
                            </a>
                        )}
                        {getUser.description && (
                            <p className="description">{getUser.description}</p>
                        )}
                    </div>
                </Grid.Column>
            </Grid>
            <ModalBasic show={showModal} setShow={setShowModal} title={titleModal}>
                {childrenModal}
            </ModalBasic>
        </>
    );
}
