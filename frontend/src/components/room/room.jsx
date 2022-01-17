import React from "react";
import { io } from 'socket.io-client'
import MessageBoxContainer from "../messages/messageBoxContainer";
class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = io('http://localhost:5000')
        this.socket.emit('join-room', this.props.roomId)
    }

    render() {
        return (
            <div id='Room'>
                <div id='freeDrawSpace'>
                    Free Draw
                </div>
                <div id='roomChat'>
                    <MessageBoxContainer socket={this.socket} roomId={this.props.roomId} />
                </div>
            </div>
        )
    }
}

export default Room