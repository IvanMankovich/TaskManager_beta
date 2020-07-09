export default function userLoggedIn(data) {
    return {
        type: 'USER_LOGGED_IN',
        payload: data,
    }
}