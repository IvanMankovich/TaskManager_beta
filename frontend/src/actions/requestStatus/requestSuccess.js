export default function requestSuccess(data, statusCode) {
    return {
        type: 'REQUEST_SUCCESS',
        payload: data,
        statusCode: statusCode,
    }
}