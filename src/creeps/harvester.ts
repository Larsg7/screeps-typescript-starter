import { CreepClass } from 'creeps/creep';

export class Harvester extends CreepClass {
  public run() {
    if (this.working && this.energyCarry < this.creep.carryCapacity) {
      this.work();
    } else if (!this.working && this.energyCarry === 0) {
      this.work();
    } else {
      this.empty();
    }
  }

  private work(): any {
    this.working = true;
    const source = this.creep.pos.findClosestByPath(FIND_SOURCES);
    if (!source) {
      this.creep.say('NO SOURCE');
      return;
    }

    if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source);
    }
  }

  private empty(): any {
    this.working = false;
    const spawn = this.findDropOff();
    if (!spawn) {
      this.creep.say('NO DROPOFF');
      return;
    }

    if (this.creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      this.creep.moveTo(spawn);
    }
  }
}
