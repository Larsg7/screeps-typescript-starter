export abstract class CreepClass {
  protected set working(value: boolean) {
    this.memory.working = value;
  }

  protected get working() {
    return this.memory.working;
  }

  protected get memory() {
    return this.creep.memory;
  }

  protected get energyCarry() {
    return this.creep.carry.energy;
  }

  protected get room() {
    return this.creep.room;
  }

  protected get pos() {
    return this.creep.pos;
  }

  protected say(say: string) {
    this.creep.say(say);
  }

  protected moveTo(target: RoomPosition | { pos: RoomPosition }) {
    this.creep.moveTo(target);
  }

  protected get name() {
    return this.creep.name;
  }

  constructor(protected creep: Creep) {}
  /**
   * run
   */
  public run() {
    console.log(`Undefined Run function for creep ${this.name}!`);
  }

  protected refill() {
    const spawn = this.findPickUp();
    if (!spawn) {
      this.say('NO SPAWN');
      return;
    }

    if (this.creep.withdraw(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.moveTo(spawn);
    }
  }

  protected findDropOff() {
    const result = this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: s =>
        (s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN) && s.energy < s.energyCapacity,
    });

    if (!result) {
      return this.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.energy < s.storeCapacity,
      });
    }

    return result;
  }

  protected findPickUp() {
    const result = this.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => s.structureType === STRUCTURE_CONTAINER && s.store.energy > 0,
    });

    if (!result) {
      return this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: s => (s.structureType === STRUCTURE_EXTENSION || s.structureType === STRUCTURE_SPAWN) && s.energy > 0,
      });
    }
    return result;
  }
}
