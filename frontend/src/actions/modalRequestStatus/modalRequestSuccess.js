export default function modalRequestSuccess(data) {
    return {
        type: 'MODAL_REQUEST_SUCCESS',
        payload: data,
    }
}