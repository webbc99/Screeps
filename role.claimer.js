module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
      creep.say(creep.memory.role);
        // if in target room
        if (creep.room.name != creep.memory.target) {
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: 'ff0000', opacity: 1}});
        }
        else {
            // try to claim controller
            if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                // move towards the controller
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff', opacity: 1}});
            }
        }
    }
};
