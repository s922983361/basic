
import imageCompression from 'browser-image-compression'
import { Notification } from 'element-ui'
/**
 * @desc browser image compression
 * https://www.npmjs.com/package/browser-image-compression
 * @param {*} file 
 * @param {*} maxSizeMB the sizeMB of file after cpmpressing (Number/mb)
 * @param {*} maxWidthOrHeight that will be resized maxWidthOrHeight (Number/px) 
 */
export const imageCompress = async (file , maxSizeMB = 0.1, maxWidthOrHeight = 300) => {
    //const imageFile = event.target.files[0];
    const imageFile = file
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)    
    var options = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true
    }

    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        return compressedFile
        //await uploadToServer(compressedFile); // write your own logic
    } catch (error) {
        Notification({
            title: 'info',
            message: '圖檔壓縮失敗!!',
            type: 'error',
            customClass: 'bg-red-200'
        })
    }
}