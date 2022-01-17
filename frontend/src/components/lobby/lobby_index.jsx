import React from "react";

class LobbyIndex extends React.Component {
    render(){
        return(
            <div className="lobby-page">
                <aside>
                    <h2>Pic feed</h2>
                </aside>
                <section className="rooms-container">
                    <ul>
                        <div className="room"><h1>Hello</h1></div>
                        <div className="room">Room</div>
                        <div className="room">Room</div>
                    </ul>
                </section>
            </div>
        )
    }
}

export default LobbyIndex;