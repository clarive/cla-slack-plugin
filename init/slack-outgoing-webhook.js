/**
 *
 *
 * Slack Outgoing WebHook for Topic message posting
 *
 * Test with:
 *
 * curl -X POST -F 'token=abcabcabcabcba3434' -F 'text=cla 37016 hello works' -F 'trigger_word=cla' http://clarive:8080/plugin/cla-slack-plugin/topic-comment
 *
 */

var reg = require("cla/reg");

reg.controller('topic-comment',{
    authenticate: false,
    handler: function(req,res){

        var web = require("cla/web");
        var util = require("cla/util");
        var ci = require('cla/ci');

        var ag = web.agent({ auto_parse: 0 });

        var trigger_word = req.param('trigger_word') || '';
        var user_name = req.param('user_name');
        var channel_id = req.param('channel_id');

        var text = req.param('text') || '';
        text = text.substring( trigger_word.length );

        var token = req.param('token');
        if( ! token ) {
            var error = _('Missing parameter: %1', 'token' );
            res.json({ text: error });
            return;
        }

        var whResource = ci.findOne('SlackOutgoingWebhook',{ token: token });

        if( ! whResource ) {
            var error = _('Invalid token: %1. Slack Outgoing Webhook resource not found.', token );
            res.json({ text: error });
            return;
        }

        var response = {};
        var mid_match = /^\s*(\S+)(.*)$/.exec( text );

        if( mid_match ) {
            var mid = mid_match[1];
            var comment = mid_match[2];

            if( ! comment ) {
                response.text = 'Nothing to post to mid ' + mid;
            }
            else {

                try {
                    if( mid && mid.length ) {

                        var Post = ci.getClass('post');

                        var post = new Post({
                            topic: mid,
                            content_type: 'html',
                            created_by: user_name
                        });

                        post.save();
                        post.putData( comment );
                    }

                    response.text = 'Ok. Posted your message to topic #' + mid;
                }
                catch(err) {
                    response.text = 'Error posting comment to mid ' + mid + ': '+ err;
                };
            }
        }

        if( !response.text ) {
            response.text = 'Sorry, nothing to do with ' + text + '.\nTry separating mid and message with spaces.';
        }

        res.json({ text: response.text });
    }
});
