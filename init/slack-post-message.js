var reg = require("cla/reg");

reg.register('service.slack.post_message', {
    name: _('Slack: Post Message'),
    icon: '/plugin/cla-slack-plugin/icon/slack.svg',
    form: '/plugin/cla-slack-plugin/form/slack-post-message.js',
    rulebook: {
        moniker: 'slack_post',
        description: _('Posts a message to Slack'),
        required: [ 'webhook'],
        mapper: { 'text':'messageText' }
    },
    handler: function(ctx, config) {

        var ci  = require("cla/ci");
        var log = require("cla/log");
        var web = require("cla/web");

        var webhookResource;
        try {
            webhookResource = ci.load( config.webhook );
        }
        catch(err) {
            log.error( 'Error loading Slack webhook: ' + err );
            log.fatal( 'Could not find Slack Webhook resource=' + config.webhook );
            return;
        }

        var url = webhookResource.webhookURL()
            || log.fatal( _('Missing URL for Slack Webhook resource: ' + config.webhook ) );

        var payload = {
            text: config.messageText
        };

        if( webhookResource.username ) {
            payload.username = webhookResource.username;
        }

        if( typeof config.payload == 'object' ) {
            Object.keys(config.payload).forEach(function(key) { payload[key] = config.payload[key]; });
        }
        else if( config.jsonData ) {
            var jsonData = JSON.parse( config.jsonData );
            if( typeof jsonData == 'object' ) {
                Object.keys(jsonData).forEach(function(key) { payload[key] = jsonData[key]; });
            }
            else {
                log.fatal( _('Invalid JSON data: ' + config.jsonData ) );
            }
        }

        try {
            payload = JSON.stringify( payload );
        }
        catch(err) {
            log.fatal( _('Could not parse JSON data for Slack message payload: ' + payload ) );
        }

        var ag = web.agent({ auto_parse: 0 });
        var res = ag.postForm( url, { payload: payload });
    }
});
