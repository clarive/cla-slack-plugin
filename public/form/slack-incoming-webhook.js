(function(params) {

    var data = params.rec || {};

    var url = Cla.ui.textArea({
        name: 'webhookURL',
        fieldLabel: _('URL'),
        height: '80px',
        value: data.webhookURL,
        bodyStyle: 'font-family: Consolas, Courier New;',
        allowBlank: false,
        anchor: '80%'
    });

    var username = Cla.ui.textField({
        name: 'username',
        fieldLabel: _('User'),
        value: data.username,
        allowBlank: true,
        anchor: '80%'
    });

    return [
        url,
        username
    ]
})

