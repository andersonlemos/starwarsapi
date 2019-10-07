import { ApiModelProperty } from "@nestjs/swagger";

export class CreatePlanetDto {

  @ApiModelProperty(  )
  public name: string;
  @ApiModelProperty(  )
  public climate: string;
  @ApiModelProperty(  )
  public ground: string;
  @ApiModelProperty(  )
  public countMoviesAppearances: number;
  @ApiModelProperty(  )
  public moviesAppearances: string[];

  constructor(
     name,
     climate,
     ground,
     countMoviesAppearances,
     moviesAppearances,
  ) {
    this.name = name;
    this.climate = climate;
    this.ground = ground;
    this.countMoviesAppearances = countMoviesAppearances;
    this.moviesAppearances = moviesAppearances;
  }
}
