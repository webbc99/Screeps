var roleCleaner = {

    /** @param {Creep} creep **/
    run: function(creep) {
        creep.say(creep.memory.role);
	    if(creep.carry.energy < creep.carryCapacity) {
            var dropped_energy = creep.room.find(FIND_DROPPED_RESOURCES);
            if(creep.pickup(dropped_energy[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropped_energy[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {opacity: 1, stroke: '#41c4f4'}});
                }
            }
        }
	}
};

module.exports = roleCleaner;
