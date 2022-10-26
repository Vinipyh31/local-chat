import React, {useEffect, useRef, useState} from 'react';
import MyModal from "../UI/modal/MyModal";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {Link} from "react-router-dom";
import RoomIdPage from "./RoomIdPage";
import RoomItem from "../RoomItem";

const Rooms = () => {
    const [modalActive, setModalActive] = useState(false);
    const [rooms, setRooms] = useLocalStorage("rooms", [
        {
            id: 1666778225701,
            name: "Обсуждение фильмов",
            description: "В данном чате вы сможете обсудить ваши любимые фильмы"
        },
        {
            id: 1666779247095,
            name: "Обсуждение аниме",
            description: "В данном чате вы сможете обсудить ваши любимые аниме"
        },
    ])
    const roomName = useRef();
    const roomDescription = useRef();
    const [userName, setUserName] = useState();

    useEffect(() => {
        window.addEventListener('storage', (event) => {
            if (event.key === "rooms") {
                setRooms(JSON.parse(event.newValue));
            }
        })
    }, [rooms])

    const createRoom = (e) => {
        e.preventDefault();
        const room = {
            id: Date.now(),
            name: roomName.current.value,
            description: roomDescription.current.value
        }
        setRooms((prev) => [...prev, room])
        setModalActive(false);
    }

    const deleteRoom = (id) => {
        setRooms((prev) => prev.filter((room, i) => i !== id))
    }

    return (
        <div>
            <input type="button" value="Создать комнату" onClick={() => setModalActive(true)}/>
            <div className="rooms-container">
                {rooms.map((room) =>
                    <RoomItem key={room.id} room={room}/>
                )}
            </div>
            <MyModal active={modalActive} setActive={setModalActive}>
                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <input type="text" ref={roomName} placeholder={"Room name"}/>
                    <input type="" ref={roomDescription} placeholder={"Description"}/>
                    <input type="submit" onClick={createRoom} value="Создать"/>
                </div>
            </MyModal>
        </div>
    );
};

export default Rooms;