import Resizer from "react-image-file-resizer";

export const fileToBase64 = (file) => {
    return new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });
}

export const blobToBase64 = blob => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise(resolve => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
};

const createImage = url =>
    new Promise((resolve, reject) => {
        const image = new Image()
        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', error => reject(error))
        image.src = url
    })

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180
}

export function base64StringtoFile(base64String, filename) {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
}


export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0, type) {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
    canvas.width = safeArea
    canvas.height = safeArea

    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.rotate(getRadianAngle(rotation))
    ctx.translate(-safeArea / 2, -safeArea / 2)

    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    )
    const data = ctx.getImageData(0, 0, safeArea, safeArea)

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    )

    const base64Url = canvas.toDataURL(`image/${type}`)

    return {
        stringUrl: base64Url,
        file: base64StringtoFile(base64Url, 'filename.jpeg')
    }
}

export const resizeFile = (file, type) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            2000,
            2000,
            "JPEG",
            85,
            0,
            (uri) => {
                resolve(uri);
            },
            type
        );
    });

export const svgUrlToSvgTag = (svgFilePath) => new Promise((resolve, reject) => {
    const parser = new DOMParser();
    const image = createImage(svgFilePath)
    console.log(image);
    fetch(svgFilePath)
        .then(response => response.text())
        .then(text => {
            const parsed = parser.parseFromString(text, 'text/html');
            const svg = parsed.querySelector('svg');
            resolve(svg)
        });
})


