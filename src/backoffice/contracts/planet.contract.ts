import { Injectable } from "@nestjs/common";
import { Contract } from "./contract";
import { Flunt } from "../../utils/flunt";
import { CreatePlanetDto } from "../dtos/create-planet-dto";

@Injectable()
export class CreatePlanetContract implements Contract {
  errors: any[];

  validate(model: CreatePlanetDto): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.name, 'Name is Invalid');
    flunt.isRequired(model.climate, 'Climate is Invalid');
    flunt.isRequired(model.ground, 'Ground is invalid');

    this.errors = flunt.errors;

    return flunt.isValid();
  }

}
