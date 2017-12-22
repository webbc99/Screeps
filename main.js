// import modules

require('prototype.creep');
require('prototype.tower');
require('prototype.spawn');

// Use this to change spawn memory - Game.spawns.Spawn1.memory.minCreeps = { upgrader: 0, lorry: 0, builder: 0, repairer: 0, wallRepairer: 0, harvester: 0, miner: 0, claimer: 0 }
// Add longDistanceHarvesters to spawn memory - Game.spawns.Spawn1.memory.minLongDistanceHarvesters = {}

module.exports.loop = function() {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for each creeps
    for (let name in Game.creeps) {
        // run creep logic
        Game.creeps[name].runRole();
        //console.log(Game.creeps[name]+':'+Game.creeps[name].memory.role);
    }

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }

    // for each spawn
    for (let spawnName in Game.spawns) {
        // run spawn logic
        Game.spawns[spawnName].spawnCreepsIfNecessary();
    }
};
