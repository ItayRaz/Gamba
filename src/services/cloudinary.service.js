
export default {
    uploadImg
}

function uploadImg(ev, imgCount) {
    const CLOUD_NAME = 'dfsjcqagx'
    const PRESET_NAME = 'asi4evfv'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const imgUrls = [];
    for (let i = 0; i < imgCount; i++) {
        const formData = new FormData();
        formData.append('file', ev.target.files[i])
        formData.append('upload_preset', PRESET_NAME);
        imgUrls.push(formData)
    }

    let uploadedImgs = imgUrls.map(data => {
        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => res.url)
            .catch(err => console.error(err))
    })
    return Promise.all(uploadedImgs)
}