var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCleaner = require('role.cleaner');
var roleWallguy = require('role.wallguy');

var tower = require('tower');
var myRooms = _.filter(Game.rooms, (room) => Game.rooms.owner === 'Aerodyne');

var maxHarvesters = 2
var maxUpgraders = 6
var maxBuilders = 1
var maxRepairers = 1
var maxCleaners = 0
var maxWallguys = 1

var minHarvesters = 1

module.exports.loop = function () {
tower.run(myRooms);

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    console.log('Repairers: ' + repairers.length);

    var cleaners = _.filter(Game.creeps, (creep) => creep.memory.role == 'cleaner');
    console.log('Cleaners: ' + cleaners.length);

    var wallguys = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallguy');
    console.log('Wallguy: ' + wallguys.length);

       if(harvesters.length < maxHarvesters) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester', working: false}});
    }

        if(builders.length < maxBuilders && harvesters.length > minHarvesters) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder', working: false}});
    }
        if(upgraders.length < maxUpgraders && harvesters.length > minHarvesters) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'upgrader', working: false}});
    }
        if(repairers.length < maxRepairers && harvesters.length > minHarvesters) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'repairer', working: false}});
    }
        if(cleaners.length < maxCleaners && harvesters.length > minHarvesters) {
        var newName = 'Cleaner' + Game.time;
        console.log('Spawning new cleaner: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'cleaner', working: false}});
    }

        if(wallguys.length < maxWallguys && harvesters.length > minHarvesters) {
        var newName = 'Wallguy' + Game.time;
        console.log('Spawning new wallguy: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'wallguy', working: false}});
    }

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            'Spawning new ' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'cleaner') {
            roleCleaner.run(creep);
        }
        if(creep.memory.role == 'wallguy') {
            roleWallguy.run(creep);
        }
    }
}
