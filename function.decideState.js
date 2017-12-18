module.exports = {

run:function(creep){
    creep.say(creep.memory.role);
    if (creep.memory.working == true && creep.carry.energy == 0) {
    // switch state
    creep.memory.working = false;
    }
    // if creep is harvesting energy but is full
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
    // switch state
    creep.memory.working = true;
    }
  }
};
