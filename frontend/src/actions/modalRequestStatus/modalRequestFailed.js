export default function modalRequestFailed(err) {
    return {
        type: 'MODAL_REQUEST_FAILED',
        payload: err,
    }
}