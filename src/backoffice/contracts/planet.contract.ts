import { Planet } from "../models/planetas/planet.model";
import { Contract } from "./contract";
import { Flunt } from "src/utils/flunt";

export class CreatePlanetContract implements Contract {
  erros: any[];

  validate(model: Planet): boolean {
    const flunt = new Flunt();

    flunt.isNotNull(model.name, 'Name is Invalid');
    flunt.isNotNull(model.climate, 'Climate is Invalid');
    flunt.isNotNull(model.ground, 'Ground is invalid');

    this.erros = flunt.errors;

    return flunt.isValid();
  }

}
