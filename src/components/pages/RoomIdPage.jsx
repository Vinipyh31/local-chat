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
    const [taggedMessage, setTaggedMessage] = useState()

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
            , 0)
    }

    const formatDate = (unixDate) => {
        const date = new Date(unixDate);
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yy = date.getFullYear();
        let h = date.getHours();
        let m = date.getMinutes();

        h = (`${h}`).length === 1 ? `0${h}` : h;
        m = (`${m}`).length === 1 ? `0${m}` : m;

        return `${h}:${m} ${dd}/${mm}/${yy}`
    }

    const formatString = (str) => {
        const maxLenght = 43;
        if (str.length > maxLenght) {
            return `${str.slice(0, maxLenght - 3)}...`;
        } else {
            return str;
        }
    }


    const addMessage = (senderName, text) => {
        const message = {
            roomId: params.id,
            time: Date.now(),
            senderName: senderName,
            text: text,
            tagged: taggedMessage,
        }
        setMessages((prev) => [...prev, message])
    }

    const changeName = (e) => {
        e.preventDefault();
        const value = userNameInput.current.value;
        if (!(value == "")) {
            setUsername(value);
            setModalActive(false)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (userName) {
            if (chatInput.current.value !== "") {
                addMessage(userName, chatInput.current.value);
                chatInput.current.value = "";
                setTaggedMessage(undefined);
                scrollDown();
            }
        } else {
            setModalActive(true);
        }
    }


    function onMessageClick(e, time) {
        e.preventDefault()
        setTaggedMessage(messages.find((message) => message.time === time))
    }

    return (
        <div className="room-id-page">
            <input
                type="button"
                value="Назад"
                className="btn"
                onClick={() => {
                    navigate("/rooms")
                }}
            />
            <div className="chat-container">
                <div className="chat">
                    <div className="chat__messages" ref={chatMessages}>
                        {messages.filter(message => message.roomId == params.id)
                            .map(message =>
                                <div
                                    key={message.time}
                                    className="message"
                                    onContextMenu={(e) => onMessageClick(e, message.time)}
                                >
                                    <div className="message__sender-name">{message.senderName}</div>
                                    <div className="message__text">
                                        {message.tagged ?
                                            <div>
                                                <div className="tagged">
                                                    <div className="tagged__info">
                                                    <span
                                                        className="tagged__info__username">{message.tagged.senderName}</span>
                                                        <br/>
                                                        <span
                                                            className="tagged__info__text">{formatString(message.tagged.text)}</span>
                                                    </div>

                                                </div>
                                                {message.text}
                                            </div>
                                            : message.text}
                                    </div>
                                    <div className="message__time">{formatDate(message.time)}</div>
                                </div>
                            )}
                    </div>
                    {taggedMessage &&
                        <div className="tagged">
                            <div className="tagged__info">
                                <span className="tagged__info__username">{taggedMessage.senderName}</span>
                                <br/>
                                <span className="tagged__info__text">{formatString(taggedMessage.text)}</span>
                            </div>
                            <svg onClick={() => {
                                setTaggedMessage(undefined)
                            }}
                                 width="24px" height="24px" viewBox="0 0 24 24" role="img"
                                 xmlns="http://www.w3.org/2000/svg" aria-labelledby="closeIconTitle" stroke="#000000"
                                 strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" fill="none"
                                 color="#000000"><title id="closeIconTitle">Close</title>
                                <path
                                    d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575"/>
                            </svg>
                        </div>}
                    <div className="chat__input-text">
                        <textarea ref={chatInput} placeholder="Сообщение"></textarea>
                        <svg
                            className="btn-send"
                            onClick={onSubmit}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512.001 512.001"
                            style={{
                                enableBackground: "new 0 0 512.001 512.001",
                            }}
                            xmlSpace="preserve"
                        >
                            <path d="M483.927 212.664 66.967 25.834C30.95 9.695-7.905 42.024 1.398 80.367l21.593 89.001c3.063 12.622 11.283 23.562 22.554 30.014l83.685 47.915c6.723 3.85 6.738 13.546 0 17.405l-83.684 47.915c-11.271 6.452-19.491 17.393-22.554 30.015L1.398 431.633c-9.283 38.257 29.507 70.691 65.569 54.534l416.961-186.83c37.455-16.783 37.405-69.913-.001-86.673zm-15.318 52.487-416.96 186.83c-7.618 3.417-15.814-3.398-13.845-11.516l21.593-89.001a10.072 10.072 0 0 1 4.761-6.337l83.685-47.915c31.857-18.239 31.887-64.167 0-82.423l-83.685-47.916a10.065 10.065 0 0 1-4.761-6.337L37.804 71.535c-1.945-8.016 6.128-14.975 13.845-11.514L468.61 246.85c7.912 3.546 7.932 14.746-.001 18.301z" />
                            <path d="m359.268 238.907-147.519-66.1c-9.444-4.231-20.523-.005-24.752 9.435-4.231 9.44-.006 20.523 9.434 24.752L305.802 256l-109.37 49.006c-9.44 4.231-13.664 15.313-9.434 24.752 4.231 9.443 15.312 13.663 24.752 9.435l147.519-66.101c14.727-6.597 14.737-27.582-.001-34.185z" />
                        </svg>
                    </div>
                </div>
            </div>
            <p className="small-text instruction">Чтобы ответить на сообщение, нужно нажать на него правой кнопкой мыши</p>
            <MyModal active={modalActive} setActive={setModalActive}>
                <div className="modal"
                >
                    <h3>Введите имя</h3>
                    <span className="small-text">Без имени вы не сможете отправлять сообщения</span>
                    <input className="modal__text-input" type="text" ref={userNameInput} placeholder="Имя"/>
                    <input className="btn" type="submit" onClick={changeName} value="Принять"/>
                </div>
            </MyModal>
        </div>
    );
};

export default RoomIdPage;