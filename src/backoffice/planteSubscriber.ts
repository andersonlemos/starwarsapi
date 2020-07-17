import {
    Connection,
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
  } from 'typeorm';
import { Planets } from './entities/planet.entity';
  
  @EventSubscriber()
  export class PlanetSubscriber implements EntitySubscriberInterface<Planets> {
    constructor(connection: Connection) {
      connection.subscribers.push(this);
    }
  
    listenTo() {
      return Planets;
    }
    
    beforeInsert(event: InsertEvent<Planets>) {
      console.log(`BEFORE PLANET INSERTED: `,  event.entity);
    }
  }