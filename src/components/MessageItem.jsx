import React from 'react';
import {formatDate, formatTaggedStr} from "../utils/strFormating";

const MessageItem = ({message, onMessageClick}) => {
    return (
        <div
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
                                    className="tagged__info__text">{formatTaggedStr(message.tagged.text)}</span>
                            </div>

                        </div>
                        {message.text}
                    </div>
                    : message.text}
            </div>
            <div className="message__time">{formatDate(message.time)}</div>
        </div>
    );
};

export default MessageItem;