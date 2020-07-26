import { InjectConnection } from '@nestjs/typeorm';
import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm';
import { Planets } from '../entities/planet.entity';

@EventSubscriber()
export class PlanetSubscriber implements EntitySubscriberInterface<Planets> {
    constructor(@InjectConnection() private readonly connection: Connection) {
        connection.subscribers.push(this);
    }

    listenTo() {
        return Planets;
    }

    beforeInsert(event: InsertEvent<Planets>) {
        console.log(`BEFORE PLANET INSERTED :: `, event.entity);
    }

    beforeUpdate(event: UpdateEvent<Planets>) {
        console.log(`BEFORE PLANET UPDATED :: `, event.entity);
    }
}
