var ci = require("cla/ci");

ci.createRole("Slack");

ci.createClass("SlackIncomingWebhook", {
    form: '/plugin/cla-slack-plugin/form/slack-incoming-webhook.js',
    icon: '/plugin/cla-slack-plugin/icon/slack.svg',
    roles: [ "Slack" ],
    has: {
        webhookURL: {
            is: "rw",
            isa: "Str",
            required: true
        },
        username: {
            is: "rw",
            isa: "Str",
            required: false
        }
    }

});

ci.createClass("SlackOutgoingWebhook", {
    form: '/plugin/cla-slack-plugin/form/slack-outgoing-webhook.js',
    icon: '/plugin/cla-slack-plugin/icon/slack.svg',
    roles: [ "Slack" ],
    has: {
        token: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }

});
