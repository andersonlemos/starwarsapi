
export class CreateUserDto {
  constructor(
    public username: string,
    public password: string,
    public active: boolean,
    public roles: any[],
  ) {}
}
