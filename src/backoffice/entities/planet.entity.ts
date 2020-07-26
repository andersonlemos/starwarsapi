import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Planets {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    name: string;

    @Column()
    climate: string;

    @Column()
    terrain: string;

    @Column({ default: 0 })
    countMoviesAppearances: number;

    @Column()
    moviesAppearances: string[];

    constructor(
        name: string,
        climate: string,
        terrain: string,
        countMoviesAppearances: number = 0,
        moviesAppearances: string[] = [],
    ) {
        this.name = name;
        this.climate = climate;
        this.terrain = terrain;
        this.countMoviesAppearances = countMoviesAppearances;
        this.moviesAppearances = moviesAppearances;
    }
}
