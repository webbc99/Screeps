var decideState = require('function.decideState');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        decideState.run(creep);
        // if creep is supposed to upgrade something
        if (creep.memory.working == true) {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(source);
            }
        }
	}
};
