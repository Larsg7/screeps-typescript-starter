import { CreepClass } from './creep';
export class Upgrader extends CreepClass {
  public run() {
    if (this.energyCarry > 0) {
      this.work();
    } else {
      this.refill();
    }
  }
  private work(): any {
    const controller = this.room.controller;
    if (!controller) {
      this.say('NO CONTROLLER');
      return;
    }

    if (this.creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
      this.moveTo(controller);
    }
  }
}
