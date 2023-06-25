#!/usr/bin/env node
const { Command } = require('commander');
const lyricsFinder = require('lyrics-finder');
const {downloadVideo} = require('./yt-downloader')
const {convertVideo} = require('./yt-mp3')
const program = new Command();




program
  .name('Welcome to YouTube video downloader and mp3 downloader!')
  .description('CLI to download YouTube videos and convert it into audio.')
  .version('0.8.0');

// program
//     .command('hello <name>')
//     .option('-c,--cap','Capitalize the name')
//     .description('Say hello to someone')
//     .action((name,options)=>{
//         console.log(` Hello ${options.cap ? name.toUpperCase() : name}`);
//     })

program
    .command('download <videoURL>')
    .description('Download a video from youtube')
    .option('-f,--folder <FolderName>','Output folder name','videos')
    .option('-n,--name <FileName>','Output file name','video')
    .action(
        async(VideoURL,options)=>{
            console.log("Please wait!");
        const {folder : FolderName, name : FileName} = options
        try {
            const OutputPath = await downloadVideo(VideoURL,FolderName,FileName)
            //console.log(`Video downloaded to ${OutputPath}`);
        } catch (error) {
            console.log(error);
        }
    })       

program
    .command('convert <VideoFilePath>')
    .description('Convert video to audio')
    .option('-f,--folder <FolderName>','Output folder name','audios')
    .option('-n,--name <FileName>','Output file name','audio')    
    .action( async (VideoFilePath,options)=>{
        console.log("Please wait!");
        const {folder : FolderName, name : FileName} = options
        try {
            const OutputPath = await convertVideo(VideoFilePath,FolderName,FileName)
            console.log(`Audio downloaded to ${OutputPath}`);
           } catch (error) {
            console.log(error);
        }
    })

program.parse(process.argv)