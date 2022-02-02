import React from "react";
import { socket } from '../../util/socket_util';

class GuessForm extends React.Component {
    constructor(props) {
        debugger
        super(props)
        // this.submit = this.submit.bind(this)
        this.state = {
            guess: "",
        }
        this.socket = socket
        this.submitGuess = this.submitGuess.bind(this)
        this.updateGuess = this.updateGuess.bind(this);
    }

    async submitGuess(e) {
        e.preventDefault()

        if (this.state.guess.length > 0){
            let guess = {}; 
            guess['word'] = this.state.guess;
            guess['roomId'] = this.props.roomId;
            guess['userId'] = this.props.userId;
            guess['chainId'] = this.props.chainId;
            await this.props.createGuess(guess)
            .catch(error => console.log(error))
            // Guesses are patched to backend game with respective players
            // chain IDs
        let chain = {};
        chain[this.props.chainId] = this.state.guess;
        this.props.updateGame({ roomId: this.props.roomId, chainObj: chain })
                
            this.socket.emit('submit-chain', this.props.roomId)
            this.props.handleSubmit()
            let button = document.getElementById('submit-one')
            button.style.display = 'none' 
            button.style.pointerEvents = 'none'
        }
    }

    updateGuess(e) {
        this.setState({ guess: e.currentTarget.value });
    }

    render(){
        return( <div className="guess-form">
            <div className="img-container">
                <img src={`https://pictophone-uploads.s3.amazonaws.com/drawing${this.props.roomId}${this.props.fetchChainId}`} alt="" />
            </div>
            <form onSubmit={this.submitGuess}>
                <h2>Your Guess:</h2>
                <input type="text" value={this.state.guess} onChange={this.updateGuess}/>
                <input id='submit-one' type="submit" value="submit"/>
            </form>
            <div id='game-errors'>
                You need to enter a guess before submitting
            </div>
        </div>
        )
    }
}

export default GuessForm;