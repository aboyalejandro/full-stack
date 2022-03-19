import React, {useState, useRef} from 'react'
import TimeAgo from "timeago-react"
import styled from "styled-components"
import {useAuthState} from "react-firebase-hooks/auth"
import {useRouter} from "next/router"
import {auth, db} from "../firebase"
import {Avatar, IconButton} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import AttachFileIcon from '@material-ui/icons/AttachFile'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic'
import {useCollection} from "react-firebase-hooks/firestore"
import Message from "../components/Message"
import firebase from "firebase"
import getRecipientEmail from "../utils/getRecipientEmail"

function ChatScreen({chat, messages}) {
    // console.log(chat, messages)
    const [user] = useAuthState(auth);
    const endOfMessagesRef = useRef(null)
    const router = useRouter();
    const [input, setInput] = useState("")
    const [messagesSnapshot] = useCollection(db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc")
    );

    const [recipientSnapshot] = useCollection(
        db.collection("users").where("email", "==", getRecipientEmail(chat.users, user))
    );

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map(message => {
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            })
        }
    }

    const ScrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        {merge: true}
        );

        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL,
        })

        setInput("");
        ScrollToBottom();
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log(recipient)
    const recipientEmail = getRecipientEmail(chat.users, user);    

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />
                ) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                <Avatar/>

                <HeaderInformation>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>Last active: {" "}
                        {recipient?.lastSeen?.toDate() ? (
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
                        ) : "Unavailable"}
                        </p>
                    ) : (
                        <p>Loading Last active...</p>
                    )}
                </HeaderInformation>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessagesContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef}/>
            </MessagesContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button 
                    hidden 
                    disabled={!input} 
                    type="submit" 
                    onClick={sendMessage}> 
                </button>
                <MicIcon/>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Input = styled.input`
    flex: 1;
    outline: 0;
    border: none;
    border-radius: 18px;
    align-items: center;
    padding: 20px;
    margin-left: 15px;
    margin-right: 15px;
    position: sticky;
    bottom: 0;
    background-color: whitesmoke;
`

const InputContainer = styled.form`
    display: flex; 
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: white; 
    z-index: 100;
`

const Container = styled.div``

const Header = styled.div`
    position:sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    heright: 88px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;

`

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`

const HeaderIcons = styled.div``

const MessagesContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`