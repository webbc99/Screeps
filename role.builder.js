//roles
var roleUpgrader = require('role.upgrader');
//functions
var decideState = require('function.decideState');
var drainSource = require('function.drainSource');

module.exports = {
    // a function to run the logic for this role
    run: function(creep) {
      decideState.run(creep);
        
        if (creep.memory.working == true) {

            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            // if we find one
            if (constructionSite != undefined) {

                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(constructionSite);
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
