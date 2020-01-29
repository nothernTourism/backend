import { Controller, UploadedFiles, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { AudioService } from './audio.service';
import { audioFileFilter, editFileName } from './audio.upload';
import { path } from 'src/config/url';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@Controller('audios')
export class AudioController {
    constructor(private readonly audioService: AudioService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor("audio", {
      storage: diskStorage({
        destination: path,
        filename: editFileName
      }),
      fileFilter: audioFileFilter
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
    this.audioService.create(result);
    return response;
  }

  @Post("multiple")
  @UseInterceptors(
    FilesInterceptor("audio", 20, {
      storage: diskStorage({
        destination: path,
        filename: editFileName
      }),
      fileFilter: audioFileFilter
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
    return await this.audioService.findOne(id)
}
}
