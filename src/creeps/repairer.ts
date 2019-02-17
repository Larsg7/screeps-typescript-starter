import { Constructor } from './constructor';
export class Repairer extends Constructor {
  protected getWorkSite() {
    return this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: s => s.hits < s.hitsMax,
    });
  }
}
