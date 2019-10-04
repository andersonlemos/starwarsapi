import { Injectable } from "@nestjs/common";
import { Planet } from "../models/planet.model";
import { Contract } from "./contract";
import { Flunt } from "../../utils/flunt";

@Injectable()
export class CreatePlanetContract implements Contract {
  errors: any[];

  validate(model: Planet): boolean {
    const flunt = new Flunt();

    flunt.isNotEmpty(model.name, 'Name is Invalid');
    flunt.isNotEmpty(model.climate, 'Climate is Invalid');
    flunt.isNotEmpty(model.ground, 'Ground is invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
