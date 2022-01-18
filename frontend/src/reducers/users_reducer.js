import { 
    RECEIVE_ALL_USERS
} from '../actions/users_actions'

const UsersReducer = (state={}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch( action.type ) {
        case RECEIVE_ALL_USERS:
            action.users.data.forEach(user => nextState[user._id] = user)
            return nextState;
        default:
            return state;
    }
}

export default UsersReducer;