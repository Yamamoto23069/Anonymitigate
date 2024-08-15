import React, { useState } from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SidebarOption from './SidebarOption';
import AddIcon from "@material-ui/icons/Add";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from '../firebase';
import { collection } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";


function Sidebar() {
    const [channels] = useCollection(collection(db, "rooms"));
    const [user] = useAuthState(auth);

    const [showChannels, setShowChannels] = useState(true); // チャンネル表示状態の管理

    const toggleChannelsVisibility = () => {
        setShowChannels(!showChannels); // 表示/非表示を切り替える
    };

    return (
        <SidebarContainer>
            <SidebarHeader>
                <SidebarInfo>
                    <h2>PAPA FAM HQ</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user?.displayName}
                    </h3>
                </SidebarInfo>
                <CreateIcon />
            </SidebarHeader>

            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
            <SidebarOption Icon={DraftsIcon} title="Saved items" />
            <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
            <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
            <SidebarOption Icon={AppsIcon} title="Apps" />
            <SidebarOption Icon={FileCopyIcon} title="File browser" />
            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
            <hr />
            <SidebarOption 
                Icon={showChannels ? ExpandLessIcon : ExpandMoreIcon}
                title="Channels" 
                onClick={toggleChannelsVisibility} 
            />
            <hr />
            <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

            {/* チャンネルリストの表示 */}
            {showChannels && channels?.docs.map(doc => (
                <SidebarOption 
                    key={doc.id} 
                    id={doc.id} 
                    title={doc.data().name}
                    isAnonymous={doc.data().isAnonymous}
                    channelType={doc.data().channelType}
            />
            ))}
            
        </SidebarContainer>
    );
}

export default Sidebar;

const SidebarContainer = styled.div`
    color: white;
    background-color: var(--slack-color);
    flex: 0.3;
    border-top: 1px solid #49274b;
    width: var(--sidebar-width, 31%); /* サイドバーの幅を動的に設定 */
    min-width: 300px; /* 最小幅を設定 */
    max-width: 300px; /* 最大幅を設定 */
    margin-top: 80px;
    height: 100vh;
    overflow-y: auto;

    /* スクロールバーを非表示にするスタイル */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none;  /* Internet Explorer 10+ */

    /* Chrome, Edge, Safari, Opera */
    &::-webkit-scrollbar {
        display: none;
    }

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
display: flex;
border-bottom: 1px solid #49274b;
padding: 13px;

> .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
}

`;

const SidebarInfo = styled.div`
    flex: 1;

    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`;
