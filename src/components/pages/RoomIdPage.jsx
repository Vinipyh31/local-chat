import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useLocalStorage} from "../hooks/useLocalStorage";
import '../../styles/RoomIdPage.css'
import MyModal from "../UI/modal/MyModal";

const RoomIdPage = () => {
    const [messages, setMessages] = useLocalStorage("messages", [
        {
            roomId: 1666778225701,
            time: 1666778225901,
            senderName: "Иван",
            text: "Что вы думаете на счет фильма 'Бойцовский клуб'?",
        },
        {
            roomId: 1666778225701,
            time: 1666778225951,
            senderName: "Дима",
            text: "Мне понравился!",
        },
        {
            roomId: 1666778225701,
            time: 1666778226151,
            senderName: "Катя",
            text: "А мне не очень... слишком много насилия",
        },
    ])

    const navigate = useNavigate();
    const params = useParams();
    const chatMessages = useRef();
    const chatInput = useRef();
    const [userName, setUsername] = useState("")
    const userNameInput = useRef();
    const [modalActive, setModalActive] = useState(true);

    useEffect(() => {
        window.addEventListener('storage', (event) => {
            if (event.key === "messages") {
                setMessages(JSON.parse(event.newValue));
                scrollDown();
            }
        })
    scrollDown();
    }, [])

    const scrollDown = () => {
        setTimeout(() => {
                chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
            }
            ,0)
    }

    const formatDate = (unixDate) => {
        const date = new Date(unixDate);
        const dd = date.getDay();
        const mm = date.getMonth()+1;
        const yy = date.getFullYear();
        let h = date.getHours();
        let m = date.getMinutes();

        h = (`${h}`).length == 1 ? `0${h}`: h;
        m = (`${m}`).length == 1 ? `0${m}`: h;

        return `${h}:${m} ${dd}/${mm}/${yy}`
    }


    const addMessage = (senderName, text) => {
        const message = {
            roomId: params.id,
            time: Date.now(),
            senderName: senderName,
            text: text,
        }
        setMessages((prev) => [...prev, message])
    }

    const changeName = () => {
        const value = userNameInput.current.value;
        if (!(value == "")) {
            setUsername(value);
            setModalActive(false)
        }
    }

    const onSubmit = () => {
        if (userName) {
            if (chatInput.current.value !== "") {
                addMessage(userName, chatInput.current.value);
                chatInput.current.value = "";
                scrollDown();
            }
        } else {
            setModalActive(true);
        }
    }


    return (
        <div className="room-id-page">
            <MyModal active={modalActive} setActive={setModalActive}>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <input type="text" ref={userNameInput} placeholder={"Username"}/>
                    <input type="submit" onClick={changeName} value="Изменить имя"/>
                </div>
            </MyModal>
            <input
                type="button"
                value="Назад"
                className="back-button"
                onClick={() => {
                    navigate("/rooms")
                }}
            />
            {`id комнаты ${params.id}`}
            <div className="chat-container">
                <div className="chat">
                    <div className="chat__messages" ref={chatMessages}>
                        {messages.filter(message => message.roomId == params.id)
                            .map(message =>
                                <div key={message.time} className="message">
                                    <div className="message__sender-name">{message.senderName}</div>
                                    <div className="message__text">{message.text}</div>
                                    <div className="message__time">{formatDate(message.time)}</div>
                                </div>
                            )}
                    </div>
                    <div className="chat__input-text">
                        <input type="text" ref={chatInput}/>
                        <input
                            type="submit"
                            value="Отправить"
                            onClick={onSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomIdPage;