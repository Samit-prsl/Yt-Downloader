const fs = require('fs')
const path = require('path')
const ytdl = require('ytdl-core')

const downloadVideo = async (VideoURL,FolderName,FileName)=>{
    const OutputPath = path.join(FolderName,`${FileName}.mp4`)
    if(fs.existsSync(OutputPath)){
        console.log(`File already exists`);
    }
    if(!fs.existsSync(FolderName)){
        fs.mkdirSync(FolderName)
    }
    const videoStream = ytdl(VideoURL,{ quality:'highest' })
    const writeStream = fs.createWriteStream(OutputPath)

    return new Promise((resolve,reject)=> {
        videoStream.pipe(writeStream)
        writeStream.on('finish',()=>{
            console.log('Video downloaded to ',OutputPath);
            resolve(OutputPath)
        })
        writeStream.on('error',()=>{
            console.log(`Error writing video to disk`);
            reject()
        })
    })
    //console.log(OutputPath,' from function');

}

module.exports = { downloadVideo }