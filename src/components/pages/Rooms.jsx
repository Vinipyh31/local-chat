import React, {useEffect, useRef, useState} from 'react';
import MyModal from "../UI/modal/MyModal";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
import RoomItem from "../RoomItem";
import '../../styles/Rooms.css'

const Rooms = () => {
    const navigate = useNavigate();
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
    const [deleteMod, setDeleteMod] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([])


    useEffect(() => {
        window.addEventListener('storage', (event) => {
            if (event.key === "rooms") {
                setRooms(JSON.parse(event.newValue));
            }
        })
    }, [])

    const createRoom = (e) => {
        e.preventDefault();
        const room = {
            id: Date.now(),
            name: roomName.current.value,
            description: roomDescription.current.value
        }

        setRooms((prev) => [...prev, room])
        roomName.current.value = "";
        roomDescription.current.value = "";
        setModalActive(false);
    }

    const deleteRooms = () => {
        setRooms((prev) => prev.filter((room) => !selectedRooms.includes(room.id)));
        setDeleteMod(false);
        setSelectedRooms([]);
    }

    const onRoomClick = (id) => {
        if (deleteMod) {
            setSelectedRooms(
                selectedRooms.includes(id) ? (prev) => prev.filter( roomId => roomId !== id ) :
                    (prev) => [...prev, id]
            )
        } else {
            navigate(`/room/${id}`)
        }
    }

    return (
        <div>
            <header>
                <input type="button" className="btn" value="Создать комнату" onClick={() => setModalActive(true)}/>

                {deleteMod ?
                    <div className="delete-container">
                        <input type="button" className="btn" value="Применить" onClick={deleteRooms}/>
                        <input type="button" className="btn" value="Отмена" onClick={() => setDeleteMod(false)}/>
                    </div>
                    :
                    <input type="button" className="btn" value="Удаление" onClick={() => setDeleteMod(true)}/>
                }
            </header>
            <div className="rooms-container">
                {rooms.map((room) =>
                    <RoomItem
                        key={room.id}
                        room={room}
                        selected={selectedRooms.includes(room.id)}
                        onRoomClick={onRoomClick}
                    />
                )}
            </div>
            <MyModal active={modalActive} setActive={setModalActive}>
                <div className="modal">
                    <input className="modal__text-input" type="text" ref={roomName} placeholder={"Название комнаты"}/>
                    <textarea name="" id="" cols="30" rows="10"
                              className="modal__text-input description" ref={roomDescription} placeholder={"Описание"}
                    ></textarea>
                    <input className="btn" type="submit" onClick={createRoom} value="Создать"/>
                </div>
            </MyModal>
        </div>
    );
};

export default Rooms;