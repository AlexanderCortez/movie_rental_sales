import { Controller, Get } from '@nestjs/common';
import * as gitRepoInfo from 'git-repo-info';

@Controller()
export class AppController {
  private readonly startedTime: Date;
  private readonly repoInfo: any;
  constructor() {
    this.startedTime = new Date();
    this.repoInfo = gitRepoInfo();
  }

  @Get('/')
  findAll(): object {
    const currentTime = new Date();
    const { abbreviatedSha, tag, branch } = this.repoInfo;
    return {
      name: 'Movie API',
      version: 1,
      license: 'MIT',
      uptime: currentTime.getTime() - this.startedTime.getTime(),
      abbreviatedSha,
      branch,
      tag,
      env: process.env.NODE_ENV,
    }
  }
}