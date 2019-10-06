export class AuthenticateDto {
  constructor(
    public username: string,
    public password: string,
    public active: boolean,
  ) { }
}
