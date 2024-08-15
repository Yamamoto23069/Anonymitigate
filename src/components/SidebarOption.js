import React, { useState } from 'react'
import styled from 'styled-components'
import { collection, addDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";
import { db } from '../firebase';
import CustomDialog from './CustomDialog'; // Import the dialog
import LockIcon from "@material-ui/icons/Lock"
import PersonOutlinedIcon from '@material-ui/icons/PersonOutline'
import CloseIcon from "@material-ui/icons/Close"


function SidebarOption({ Icon, title, addChannelOption, id, isAnonymous, channelType , onClick }) {
    const dispatch = useDispatch();
    const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

    const addChannel = async (channelName, isAnonymous, channelType ) => {
    if (channelName) {
        try {
            const channelsCollection = collection(db, 'rooms');
            await addDoc(channelsCollection, { name: channelName, isAnonymous, channelType });
            console.log('Channel added successfully');
        } catch (error) {
            console.error('Error adding channel: ', error);
        }
    }
};

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleDialogSubmit = (channelName, isAnonymous, channelType) => {
        addChannel(channelName, isAnonymous, channelType);
        closeDialog(); // Close the dialog after submission
    };

    const selectChannel = () => {
        if (id) {
            dispatch(
                enterRoom({
                    roomId: id,
                })
            );
        }
    };

    return (
        <SidebarOptionContainer 
            onClick={onClick || (addChannelOption ? addChannel : selectChannel)}//openDialog
        >
            { Icon && <Icon fontSize="small" style={ { padding: 10 } } />}
             { isAnonymous && (
                    <IconContainer>
                        <PersonOutlinedIcon style={{ fontSize: 30, verticalAlign: 'middle' }} />
                        <CloseIcon style={{ fontSize: 25, position: 'absolute', top: 7, left: 3, color: 'red' }} />
                    </IconContainer>
            {Icon ? (
                <h3>{title}</h3>
            ) : (
                <SidebarOptionChannel>
                    {channelType === 'private' ? <LockIcon style={{ fontSize: 20 }} /> : <span>#</span>} {title}
                </SidebarOptionChannel>

              {/* Render the dialog */}
            {addChannelOption && (
                <CustomDialog 
                    open={dialogOpen} 
                    onClose={closeDialog} 
                    onSubmit={handleDialogSubmit}
                />
>

        <>
            <SidebarOptionContainer 
                onClick={addChannelOption ? openDialog : selectChannel} // Use openDialog here
            >
                {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}
                { isAnonymous && (
                    <IconContainer>
                        <PersonOutlinedIcon style={{ fontSize: 30, verticalAlign: 'middle' }} />
                        <CloseIcon style={{ fontSize: 25, position: 'absolute', top: 7, left: 3, color: 'red' }} />
                    </IconContainer>
                )}
                {Icon ? (
                    <h3>{title}</h3>
                ) : (
                    <SidebarOptionChannel>
                        {channelType === 'private' ? <LockIcon style={{ fontSize: 20 }} /> : <span>#</span>} {title}
                    </SidebarOptionChannel>
                )}
            </SidebarOptionContainer>
            
            {/* Render the dialog */}
            {addChannelOption && (
                <CustomDialog 
                    open={dialogOpen} 
                    onClose={closeDialog} 
                    onSubmit={handleDialogSubmit}
                />

            )}
        </>
    );

}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3 {
        font-weight: 500;
        margin-left: 10px;
    }

    > h3 > span {
        padding: 15px;
    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;

`;

const IconContainer = styled.div`
    position: relative;
    display: inline-block;
`;
