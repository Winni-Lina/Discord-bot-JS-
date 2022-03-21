const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("환영합니다")
    .setDescription("(관리자 명령어) 유저를 환영용 알림을 띄웁니다.")
    .addStringOption(option => option.setName('mention').setDescription('Enter mention')),

  async execute(interaction) {
    var embed = new MessageEmbed()
        .setColor('0x62c1cc')
        .setTitle("**"+interaction.options.getString('mention')+"님이 심심 서버에 오셨어요!**\n다같이 환영해주세요!")
        .setDescription(interaction.options.getString('input')+"님\n<#949001091046076448>,  <#948945485912244264>와 <#949382475686215760>을 확인해주세요.");
        await interaction.reply("<@&950761653622943784>");
        await interaction.reply({embeds : [embed]});
    //   await interaction.reply(interaction.options.getString('mention'));


  },
};