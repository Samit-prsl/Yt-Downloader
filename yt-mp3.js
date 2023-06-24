const path = require('path')
const fs = require('fs')

const ffmegPath = require('ffmpeg-static')
const ffmeg = require('fluent-ffmpeg')


ffmeg.setFfmpegPath(ffmegPath)

const convertVideo = async (videoFilePath,folderName,fileName)=>{
    const OutputFilePath = path.join(folderName,`${fileName}.mp3`)
    if(fs.existsSync(OutputFilePath)){
        console.log(`Audio file already exists`);
        return OutputFilePath
    }
    if(!fs.existsSync(folderName)){
        fs.mkdirSync(folderName)
    }
return new Promise((resolve,reject)=>{
    ffmeg(videoFilePath)
        .outputOptions([
            '-vn',
            '-acodec','libmp3lame',
            '-ac','2',
            '-ab','160k',
            '-ar','48000'
        ])
        .save(OutputFilePath)
        .on('error',(error)=>{
            console.log('ffmpeg error: ',error);
            reject(error)
        })
        .on('end',()=>{
            console.log(`ffmpeg process completed`);
            resolve(OutputFilePath)
        })
})
}

module.exports = { convertVideo }