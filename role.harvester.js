//roles
var roleUpgrader = require('role.upgrader');

//functions
var decideState = require('function.decideState');
var drainSource = require('function.drainSource');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        decideState.run(creep);
        // if creep is supposed to transfer energy to the spawn or an extension
        if (creep.memory.working == true) {
            // find closest spawn or extension which is not full
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.energy < s.energyCapacity
            });
            if (structure == undefined){
              structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => ((s.structureType == STRUCTURE_CONTAINER) && (s.store[RESOURCE_ENERGY] < s.storeCapacity))
              });
            }
            // if we found one
            if (structure != undefined) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
              roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            drainSource.run(creep);
        }
    }
};
