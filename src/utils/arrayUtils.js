export const arrayDiff = (a1, a2, first) => {
    if (first) {
        return a1.filter(x => a2.indexOf(x) === -1);
    } else {
        return a2.filter(x => a1.indexOf(x) === -1);
    }
};