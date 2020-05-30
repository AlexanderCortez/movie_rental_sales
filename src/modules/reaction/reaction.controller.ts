import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReactionService } from '@reaction-module/reaction.service';
import { Reaction } from '@entities/reaction.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@role-module/role.guard';
import { Roles } from '@role-module/role.decorator';

@Controller('reactions')
export class ReactionController {
  constructor(
    private readonly reactionService: ReactionService,
  ) {}
  
  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(): Promise<Reaction[]> {
    return this.reactionService.findAll();
  }
}