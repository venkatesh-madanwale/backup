import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './schema/user.schema';



@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('email/:emailid') // e.g., GET /users/email/example@example.com
    async findByEmail(@Param('emailid') emailid: string) {
        return this.userService.findByEmail(emailid);
    }

    @Post() // e.g., POST /users with body { name: ..., email: ... }
    async create(@Body() data: Partial<User>): Promise<User> {
        return this.userService.create(data);
    }

    @Patch(':id') // e.g., PATCH /users/123 with body { name: ..., email: ... }
    async update(
        @Param('id') id: string,
        @Body() data: Partial<User>
    ): Promise<User> {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id') // e.g., DELETE /users/123
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        return this.userService.deleteUser(id);
    }
}





// @Controller('users')
// export class UserController {
//     constructor(private readonly userService: UserService) { }

    
//     @MessagePattern({ cmd: "find-by-email" })
//     async findByEmail(emailid: string) {
//         return this.userService.findByEmail(emailid)
//     }

//     @MessagePattern({ cmd: "account-create" })
//     async create(data: Partial<User>): Promise<User> {
//         return this.userService.create(data)
//     }

//     @MessagePattern({ cmd: 'update-user' })
//     async update(@Payload() payload: { id: string; data: Partial<User> }): Promise<User> {
//         // Extract user ID and the partial user data to update
//         return this.userService.updateUser(payload.id, payload.data);
//     }

//     @MessagePattern({ cmd: 'delete-user' }) // Delete user by ID
//     async delete(@Payload() id: string): Promise<{ message: string }> {
//         return this.userService.deleteUser(id);
//     }

// }