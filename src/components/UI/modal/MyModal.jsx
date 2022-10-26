import React from 'react';
import cl from "./MyModal.module.css"

const MyModal = ({active, setActive, children}) => {
    return (
        <div className={ active ? [cl.myModal, cl.active].join(' ') : cl.myModal  } onClick={() => setActive(false)}>
            <div className={cl.myModalContent} onClick={e => e.stopPropagation()} >
                {children}
            </div>
        </div>
    );
};

export default MyModal;