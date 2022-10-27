
export const formatDate = (unixDate) => {
    const date = new Date(unixDate);
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();
    let h = date.getHours();
    let m = date.getMinutes();

    h = (`${h}`).length === 1 ? `0${h}` : h;
    m = (`${m}`).length === 1 ? `0${m}` : m;

    return `${h}:${m} ${dd}/${mm}/${yy}`
}

export const formatTaggedStr = (str) => {
    const maxLength = 43;
    if (str.length > maxLength) {
        return `${str.slice(0, maxLength - 3)}...`;
    } else {
        return str;
    }
}