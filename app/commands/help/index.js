const help = async (ctx) => {
    let helpArray;
    if(ctx.user.admin) {
        helpArray = [
            '/help - данная команда.',
            '/id [id] - информация по раннеру. Без [id] показывает ваш id в телеграм.',
            '/say [id] [text] - команда общения с пользователями.',
            '/list - вывод всех раннеров',
            '/delete [id] - удаление раннера.',
            '/search [text] - поиск по номеру кошелька и т.д.',
            '/gotchi [ссылка] - добавить свободного гочика.'
        ];
    } else {
        helpArray =  [
            '/help - данная команда.',
            '/id - Показывает ваш id в телеграм.',
            '/matic - запрос матика.',
            '/gotchi - запрос гочика.',
        ];
    }

    let text = 'Список команд:\n';

    helpArray.map(item => {
        text += item + '\n';
    });

    await ctx.replyWithHTML(text, {
        disable_web_page_preview: true
    });
}

export default help;