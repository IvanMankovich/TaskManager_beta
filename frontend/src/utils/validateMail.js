export default function validateMail(str) {
    let regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    return regexp.test(str);
}