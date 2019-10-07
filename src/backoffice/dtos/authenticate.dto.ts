import { ApiModelProperty } from '@nestjs/swagger';

export class AuthenticateDto {
  @ApiModelProperty(  )
  public username: string;
  @ApiModelProperty(  )
  public password: string;
   constructor(
    username,
    password,
    ) {
  this.username = username;
  this.password = password;
  }

}
