export default function requestFailed(error, statusCode) {
    return {
        type: 'REQUEST_FAILED',
        payload: error,
        statusCode: statusCode,
    }
}