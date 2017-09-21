(function(params) {

    var data = params.data || {};

    var webhook = Cla.ui.ciCombo({
        name: 'webhook',
        value: data.webhook,
        class: 'SlackIncomingWebhook',
        fieldLabel: _('Incoming Webhook'),
        allowBlank: false
    });

    var messageText = Cla.ui.textArea({
        name: 'messageText',
        fieldLabel: _('Text'),
        height: '150px',
        bodyStyle: 'font-family: Consolas, Courier New;',
        allowBlank: false,
        value: data.messageText || '',
        anchor: '80%'
    });

    var jsonData = Cla.ui.textArea({
        name: 'jsonData',
        height: '250px',
        fieldLabel: _('JSON Data'),
        bodyStyle: 'font-family: Consolas, Courier New;',
        value: data.jsonData || '{\n}',
        allowBlank: true,
        anchor: '80%'
    });

    return [
        webhook,
        messageText,
        jsonData
    ]
})


