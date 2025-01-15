import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { CreateTagDto, UpdateTagDto } from '../dto/tag.dto';
import { TagEntity } from 'src/database/entities';
import { TagService } from '../services/tag.service';
import { Roles } from 'src/utility/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserRole } from 'src/utility/enum/role';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('tags')
@ApiTags('Tags')
@ApiBearerAuth() // Add Bearer token in Swagger UI
@UseGuards(JwtAuthGuard, RoleGuard) // Use both JwtAuthGuard and RoleGuard
@Roles(UserRole.MANAGER, UserRole.EMPLOYEE) // Allow MANAGER roles
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new tag' })
  @ApiBody({ type: CreateTagDto })
  @ApiResponse({
    status: 201,
    description: 'The tag has been successfully created.',
    type: TagEntity,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createTag(@Body() createTagDto: CreateTagDto): Promise<TagEntity> {
    return this.tagService.createTag(createTagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tags' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all tags.',
    type: [TagEntity],
  })
  async getAllTags(@Query('search') search: string): Promise<TagEntity[]> {
    return this.tagService.getAllTags(search);
  }
}
