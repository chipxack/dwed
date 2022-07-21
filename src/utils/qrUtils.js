import QRCode from 'qrcode-svg'
import QR from 'qrcode-base64'

export const generateQrCodeSvg = (data, size) => {
    const qrcode = new QRCode({
        content: data,
        padding: 1,
        width: size || 32,
        height: size || 32,
        color: "#000000",
        background: "#ffffff",
        ecl: "L",
        join: true,
    });

    return qrcode.svg()
}

export const generateQrCodeBase64 = (data) => {
    return QR.drawImg(data, {
        typeNumber: 4,
        errorCorrectLevel: 'M',
        size: 500
    })
}


export function svgString2Image(svgString, width, height, format, callback) {
    format = format ? format : 'png';
    const svgData = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    const image = new Image();

    image.onload = function () { // async (happens later)
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        const pngData = canvas.toDataURL('image/' + format);
        callback(pngData);
    };
    image.src = svgData;
}

export function downloadURI(uri, name) {
    const link = document.createElement("a");
    link.setAttribute('download', name);
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    link.remove();
}
