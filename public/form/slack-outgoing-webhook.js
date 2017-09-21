(function(params) {

    var data = params.rec || {};

    var token = Cla.ui.textArea({
        name: 'token',
        fieldLabel: _('Slack Token'),
        height: '80px',
        value: data.token,
        bodyStyle: 'font-family: Consolas, Courier New;',
        allowBlank: false,
        anchor: '80%'
    });

    return [
        token
    ]
})


