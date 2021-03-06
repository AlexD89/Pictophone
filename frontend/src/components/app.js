import React from "react";
import NavBarContainer from "./navbar/navbar_container";
import LinkBarContainer from "./linkbar/linkBar";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';
import Splash from "./splash/splash";
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import RoomContainer from "./room/roomContainer";
import LobbyContainer from './lobby/lobby_container';
import GameBoard from "./board/game_board";



const App = () => (
    <div id='appMain'>
        <NavBarContainer />
        <Switch>
            <ProtectedRoute path='/rooms/:roomId' component={RoomContainer}/> 
            <AuthRoute exact path='/login' component={LoginFormContainer} />
            <AuthRoute exact path='/signup' component={SignupFormContainer} />
            <ProtectedRoute path='/lobby' component={LobbyContainer}/>
            <AuthRoute exact path='/' component={Splash} />
        </Switch>
        <LinkBarContainer />
    </div>
);

export default App;