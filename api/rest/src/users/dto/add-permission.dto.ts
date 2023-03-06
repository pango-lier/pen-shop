import { PartialType } from "@nestjs/swagger";

export class AddPermissionDto {
  name: string;
  guard_name: string;
  displayName: string;
}

export class UpdatePermissionDto extends PartialType(AddPermissionDto) {
  id: string;
}

export type SyncPermissionDto = UpdatePermissionDto | AddPermissionDto;