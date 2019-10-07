import { ApiModelProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiModelProperty(  )
  public username: string;
  @ApiModelProperty(  )
  public password: string;
  @ApiModelProperty(  )
  public active: boolean;

  constructor(
    username,
    password,
    active,
  ) {
  this.username = username;
  this.password = password;
  this.active = active;
  }
}
