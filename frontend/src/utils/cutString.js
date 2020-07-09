export default function cutString(str) {
    return str.length > 99 ? `${str.slice(0, 99)}...` : str;
};