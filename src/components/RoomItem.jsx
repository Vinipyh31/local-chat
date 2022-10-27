import React from 'react';
import '../styles/RoomItem.css'

const RoomItem = ({room, selected, onRoomClick}) => {
    return (
        <div
            className="room-item"
            onClick={() => onRoomClick(room.id)}
        >
            <div className="room-item__name">{room.name}{selected &&
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="24px" height="24px"><linearGradient id="IMoH7gpu5un5Dx2vID39Ra" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#9dffce"/><stop offset="1" stopColor="#50d18d"/></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/><linearGradient id="IMoH7gpu5un5Dx2vID39Rb" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stopColor="#135d36"/><stop offset=".931" stopColor="#125933"/><stop offset="1" stopColor="#11522f"/></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"/></svg>
            }
            </div>
            <div className="room-item__description">{room.description}</div>
        </div>
    );
};

export default RoomItem;