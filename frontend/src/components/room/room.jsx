import React from "react";
import { io } from 'socket.io-client';
import { socket } from '../../util/socket_util';
import MessageBoxContainer from "../messages/messageBoxContainer";
// import DrawingBoard from '../board/drawing_board';
import Board from '../board/board';

class Room extends React.Component {
    constructor(props){
        super(props)
        this.socket = socket;
        this.socket.emit('join-room', this.props.roomId);

        this.leaveRoom = this.leaveRoom.bind(this)
    }

    componentDidMount(){
        this.props.requestRoom(this.props.roomId)
            .then(()=>{
                if(!this.props.room.players.includes(this.props.currentUser.id)){
                    let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
                    this.props.updateRoom(object);
                }
            })
    }

    componentWillUnmount(){
        let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id };
        this.props.updateRoom(object);
    }

    leaveRoom(e) {
        e.preventDefault();
        // let object = { 'roomId': this.props.roomId, 'playerId': this.props.currentUser.id};
        // this.props.updateRoom(object);
        this.props.history.push('/lobby');
    }

    render() {
        if (!this.props.room) return null;
        return (
        <div className='room-main'>
            <div id='draw-container'>
                <div id='freeDrawSpace'>
                    <Board roomId={this.props.roomId}></Board>
                </div>
                <div id='chat-container'>
                    <button onClick={this.leaveRoom}
                        id='leaveRoom'>
                        Leave Room
                    </button>
                    <MessageBoxContainer roomId={this.props.roomId} />
                </div>
            </div>
        </div>
           
        )
    }
}

export default Room