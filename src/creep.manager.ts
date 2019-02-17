import { Harvester } from 'creeps/harvester';
import { Upgrader } from 'creeps/upgrader';
import { generateName } from 'utils/NameGenerator';
import { Constructor } from './creeps/constructor';
import { Repairer } from './creeps/repairer';
import { CONST, CREEP_ROLE } from './utils/Constants';

export class CreepManager {
  private numCreeps: { [K: string]: number } = {
    [CREEP_ROLE.UPGRADER]: 0,
    [CREEP_ROLE.CONSTRUCTOR]: 0,
    [CREEP_ROLE.REPAIRER]: 0,
    [CREEP_ROLE.HARVESTER]: 0,
  };
  public run() {
    for (const name in Game.creeps) {
      if (Game.creeps.hasOwnProperty(name)) {
        const creep = Game.creeps[name];
        this.runCreep(creep);
      }
    }

    this.spawnCreeps();
  }

  private runCreep(creep: Creep): any {
    const role = creep.memory.role;
    switch (role) {
      case CREEP_ROLE.HARVESTER:
        new Harvester(creep).run();
        break;
      case CREEP_ROLE.UPGRADER:
        new Upgrader(creep).run();
        break;
      case CREEP_ROLE.CONSTRUCTOR:
        new Constructor(creep).run();
        break;
      case CREEP_ROLE.REPAIRER:
        new Repairer(creep).run();
        break;

      default:
        creep.say('RUN ROLE UNDEFINED');
        break;
    }

    this.numCreeps[role]++;
  }

  private spawnCreeps(): any {
    const spawn = Game.spawns.Spawn1;

    for (const role in this.numCreeps) {
      if (this.numCreeps.hasOwnProperty(role)) {
        const numRole = this.numCreeps[role];

        if (numRole < CONST.MAX[role]) {
          this.spawn(role as CREEP_ROLE, spawn);
        }
      }
    }
  }

  private spawn(role: CREEP_ROLE, spawn: StructureSpawn) {
    let body: BodyPartConstant[] = [];
    switch (role) {
      case CREEP_ROLE.HARVESTER:
        body = [WORK, CARRY, CARRY, MOVE, MOVE];
        break;
      case CREEP_ROLE.UPGRADER:
        body = [WORK, CARRY, CARRY, MOVE, MOVE];
        break;
      case CREEP_ROLE.CONSTRUCTOR:
      case CREEP_ROLE.REPAIRER:
        body = [WORK, CARRY, CARRY, MOVE, MOVE];
        break;

      default:
        throw new Error(`No body defined for role ${role}!`);
    }

    const name = generateName(role);

    spawn.spawnCreep(body, name, {
      memory: {
        role,
        room: spawn.room.name,
        working: false,
      },
    });
  }
}
