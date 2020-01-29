import { Controller, UploadedFiles, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';

import { path } from 'src/config/url';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { VideoService } from './video.service';
import { editFileName,videoFileFilter } from './video.upload';

@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("video", {
      storage: diskStorage({
        destination: path,
        filename: editFileName
      }),
      fileFilter: videoFileFilter
    })
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename
    };
    const result = {
      place: file.filename,
      urlpath: `${path}/${file.filename}`
    };
    console.log(result)
    this.videoService.create(result);
    return response;
  }

  @Post("multiple")
  @UseInterceptors(
    FilesInterceptor("video", 20, {
      storage: diskStorage({
        destination: path,
        filename: editFileName
      }),
      fileFilter: videoFileFilter
    })
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename
      };
      response.push(fileReponse);
    });
    return response;
  }

//   @Get(":audiopath")
//   seeUploadedFile(@Param("audiopath") audio, @Res() res) {
//     return res.sendFile(audio, { root: path });
//   }

  @Get(":id")
  async getFile(@Param('id') id){
    // console.log(req)
    return await this.videoService.findOne(id)
}
}
