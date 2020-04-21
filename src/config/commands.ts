export default {
  BanCommand: {
    name: 'ban',
    aliases: [],
    category: 'moderation',
    permissionOptions: {
      required: true,
      permissions: ['BAN_MEMBERS'],
    },
    commandOptions: {
      delimiter: '\\s+',
      argumentsRequired: true,
    },
  },
  KickCommand: {
    name: 'kick',
    aliases: [],
    category: 'moderation',
    permissionOptions: {
      required: true,
      permissions: ['KICK_MEMBERS'],
    },
    commandOptions: {
      delimiter: '\\s+',
      argumentsRequired: true,
    },
  },
  UnbanCommand: {
    name: 'unban',
    aliases: [],
    category: 'moderation',
    permissionOptions: {
      required: true,
      permissions: ['BAN_MEMBERS'],
    },
    commandOptions: {
      delimiter: '\\s+',
      argumentsRequired: true,
    },
  },
  MuteCommand: {
    name: 'mute',
    aliases: [],
    category: 'moderation',
    permissionOptions: {
      required: true,
      permissions: ['BAN_MEMBERS', 'KICK_MEMBERS'],
    },
    commandOptions: {
      delimiter: '\\s+',
      argumentsRequired: true,
    },
  },
  StatsCommand: {
    name: 'stats',
    aliases: [],
    category: 'miscellaneous',
    permissionOptions: {
      required: false,
      permissions: [],
    },
    commandOptions: {
      delimiter: '\\s+',
      argumentsRequired: true,
    },
  },
  InfoCommand: {
    name: 'info',
    aliases: [],
    category: 'miscellaneous',
    permissionOptions: {
      required: false,
      permissions: [],
    },
    commandOptions: {
      delimiter: '\\s+',
      argumentsRequired: false,
    },
  },
};
