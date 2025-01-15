import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
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
  async getAllTags(): Promise<TagEntity[]> {
    return this.tagService.getAllTags();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific tag by ID' })
  @ApiParam({ name: 'id', description: 'ID of the tag to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Returns the details of the tag.',
    type: TagEntity,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  async getTagById(@Param('id') id: string): Promise<TagEntity> {
    return this.tagService.getTagById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing tag' })
  @ApiParam({ name: 'id', description: 'ID of the tag to update' })
  @ApiBody({ type: UpdateTagDto })
  @ApiResponse({
    status: 200,
    description: 'The tag has been successfully updated.',
    type: TagEntity,
  })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  async updateTag(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<TagEntity> {
    return this.tagService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a tag by ID' })
  @ApiParam({ name: 'id', description: 'ID of the tag to delete' })
  @ApiResponse({ status: 204, description: 'Tag successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Tag not found' })
  async deleteTag(@Param('id') id: string): Promise<void> {
    await this.tagService.deleteTag(id);
  }
}
