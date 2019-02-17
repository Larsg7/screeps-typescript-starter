import { CreepClass } from './creep';
export class Constructor extends CreepClass {
  public run() {
    if ((!this.working && this.energyCarry < this.creep.carryCapacity) || this.energyCarry === 0) {
      this.refill();
    } else {
      this.work();
    }
  }
  private work(): any {
    const site = this.getWorkSite();
    if (!site) {
      this.working = false;
      return;
    }

    this.working = true;

    if (this.build(site) === ERR_NOT_IN_RANGE) {
      this.moveTo(site);
    }
  }

  protected build(site: ConstructionSite | Structure) {
    if (site instanceof ConstructionSite) {
      return this.creep.build(site);
    } else {
      return this.creep.repair(site);
    }
  }

  protected getWorkSite(): ConstructionSite | Structure | null {
    const site = this.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    return site;
  }
}
