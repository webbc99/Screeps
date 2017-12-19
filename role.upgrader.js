var decideState = require('function.decideState');
var drainSource = require('function.drainSource');

module.exports = {

    /** @param {Creep} creep **/
    run: function(creep) {
        decideState.run(creep);
        // if creep is supposed to upgrade something
        if (creep.memory.working == true) {

            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {opacity: 1, stroke: '#9d00ff'}});
            }
        }
        else {
            drainSource.run(creep);
        }
	}
};
