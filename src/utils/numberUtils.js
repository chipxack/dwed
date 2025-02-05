export function numberFormat(number, decimals, dec_point = '.', thousands_sep = ' ') {  // Format a number with grouped thousands
    let i, j, kw, kd, km, nl, lkd;
    if (isNaN(decimals = Math.abs(decimals))) {
        decimals = 2;
    }
    if (dec_point === undefined) {
        dec_point = ".";
    }
    if (thousands_sep === undefined) {
        thousands_sep = " ";
    }
    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";
    if ((j = i.length) > 3) {
        j = j % 3;
    } else {
        j = 0;
    }
    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    kd = '0' + (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
    nl = parseFloat(kd).valueOf();
    if (nl > 0) {
        lkd = nl.toString().substr(1);
    } else {
        lkd = '';
    }
    return km + kw + lkd;
}