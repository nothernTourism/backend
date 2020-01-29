import { Controller, UploadedFiles, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { HistoryService } from './history.service';
import { historyFileFilter, editFileName } from './history.upload';
import { path } from 'src/config/url';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) { }

  @Get()
  getHello(): string {
    return "igjgj";
  }

  @Post()
  @UseInterceptors(
    FileInterceptor("audio", {
      storage: diskStorage({
        destination: path,
        filename: editFileName
      }),
      fileFilter: historyFileFilter
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
    this.historyService.create(result);
    return response;
  }

  @Post("multiple")
  @UseInterceptors(
    FilesInterceptor("audio", 20, {
      storage: diskStorage({
        destination: path,
        filename: editFileName
      }),
      fileFilter: historyFileFilter
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
  async getFile(@Param('id') id) {
    // console.log(req)
    return await this.historyService.findOne(id)
  }
}
