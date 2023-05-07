import { IsNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty()
  chatName: string;

  @ArrayMinSize(2)
  users: string[];
}

export class UpdateGroupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  groupId: string;
}

export class AddNewUserDto {
  @IsNotEmpty()
  groupId: string;

  @ArrayMinSize(1)
  newUser: string[];
}

export class RemoveUserDto {
  @IsNotEmpty()
  groupId: string;

  @ArrayMinSize(1)
  removeUser: string[];
}
