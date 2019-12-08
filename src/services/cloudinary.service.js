
export default {
    uploadImg,
    uploadVideo
}

function uploadImg(ev, imgCount) {
    if (!imgCount) imgCount = 1;
    const CLOUD_NAME = 'dfsjcqagx'
    const PRESET_NAME = 'asi4evfv'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const imgUrls = [];    
    for (let i = 0; i < imgCount; i++) {
        const formData = new FormData();
        console.log('ev target',ev.target.files[i]);
        
        formData.append('file', ev.target.files[i])
        formData.append('upload_preset', PRESET_NAME);
        // console.log(formData);
        
        imgUrls.push(formData)
    }

    let uploadedImgs = imgUrls.map(data => {
        console.log('urls',imgUrls);
        
        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.url);
                return res.url
            })
            .catch(err => console.error(err))
    })
    return Promise.all(uploadedImgs)
}

function uploadVideo(ev, videoCount) {
    
    if (!videoCount) videoCount = 1;
    const CLOUD_NAME = 'dfsjcqagx'
    const PRESET_NAME = 'asi4evfv'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`
    const videoUrls = [];    
    for (let i = 0; i < videoCount; i++) {
        const formData = new FormData();
        console.log('ev target',ev.target.files[i]);
        
        formData.append('file', ev.target.files[i])
        formData.append('upload_preset', PRESET_NAME);
        // console.log(formData);
        
        videoUrls.push(formData)
    }

    let uploadedVideos = videoUrls.map(data => {
        
        return fetch(UPLOAD_URL, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.url);
                return res.url
            })
            .catch(err => console.error(err))
    })
    return Promise.all(uploadedVideos)
}