export class CreatePlanetDto {
  constructor(
    public name: string,
    public climate: string,
    public ground: string,
    public moviesAppearances: number,
  ) {}
}
