import axios from 'axios';

export const fetchAllRooms = () => {
    return axios.get("/api/rooms")
}

export const fetchRoom = (roomId) => {
    return axios.get(`/api/rooms/${roomId}`)
}

export const createRoom = room => {
    return axios.post(`/api/rooms/`, room)
}

export const updateRoom = (roomId, playerId) => {
    return axios.patch(`/api/rooms/${roomId}`, {"playerId":playerId})
}

export const deleteRoom = (roomId) => {
    return axios.delete(`/api/rooms/${roomId}`)
}