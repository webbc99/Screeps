//roles
var roleBuilder = require('role.builder');

//functions
var decideState = require('function.decideState');
var drainSource = require('function.drainSource');


module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
        decideState.run(creep);
        // if creep is supposed to repair something
        if (creep.memory.working == true)
            if (structure === undefined) {

            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_ROAD

            });
            }
            // if we find one
            if (structure != undefined) {
                // try to repair it, if it is out of range
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // if we can't fine one
            else {
                // look for construction sites
                roleBuilder.run(creep);
            }

        // if creep is supposed to harvest energy from source
        else {
            drainSource.run(creep);
        }
    }
};
