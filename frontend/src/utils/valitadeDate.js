export default function validateDate(str) {
    let regexp = /^(20)\d{2}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    if (regexp.test(str) && str >= new Date(new Date(new Date()).setDate(new Date(new Date()).getDate() + 1)).toISOString().slice(0, 10) && str <= `${new Date().getFullYear()+1}-${new Date().toISOString().slice(5, 10)}`) {
        let [yyyy, mm, dd] = str.split(/\D/);
        let daysPerMonths = [31,28,31,30,31,30,31,31,30,31,30,31];
        if (mm !== '02') {
            return dd && dd <= daysPerMonths[mm-1];
        } else {
            let leapYear = !((yyyy % 4) || (!(yyyy % 100) && (yyyy % 400)));
            return leapYear && dd && dd <= 29 || !leapYear && dd && dd <= daysPerMonths[1]; 
        }
    } else {
        return false;
    }
}