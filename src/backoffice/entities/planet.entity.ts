import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Planets {
    @ObjectIdColumn()
    id: ObjectID
    
    @Column()
    name: string

    @Column()
    climate: string
    
    @Column()
    ground: string

    @Column({ default: 0 })
    countMoviesAppearances: number

    @Column()
    moviesAppearances: string[]
    contructor(name:string,climate:string,ground:string,countMoviesAppearances:number,moviesAppearances:string[]){
        this.name=name
        this.climate=climate
        this.ground=ground
        this.countMoviesAppearances=countMoviesAppearances
        this.moviesAppearances=moviesAppearances
    }
}
