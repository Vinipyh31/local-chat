import React from 'react';
import {useNavigate} from 'react-router-dom'
import '../styles/RoomItem.css'
import RoomIdPage from "./pages/RoomIdPage";

const RoomItem = ({room}) => {

    const navigate = useNavigate()

    const onRoomClick = (id) => {
        navigate(`/room/${room.id}`)
    }

    return (
        <div
            className="room-item"
            onClick={() => onRoomClick(room.id)}
        >
            <div className="room-item__name">{room.name}</div>
            <div className="room-item__description">{room.description}</div>
        </div>
    );
};

export default RoomItem;