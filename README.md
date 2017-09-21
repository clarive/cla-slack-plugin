# Slack Clarive Plugin

![Clarive Slack Plugin](public/icon/slack.png?raw=true "Clarive Slack Plugin")

## Posting messages to Slack

The Slack notification op allows you to add Slack notifications into Clarive
rules, including events and pipeline rules.

To set it up you need to configure your Slack account and add at least one
Clarive resource.

### Slack Configuration

Clarive uses Slack's Incoming WebHooks to post messages.

To set it up, sign in to your Slack team and start a new Incoming WebHooks
configuration.

https://api.slack.com/incoming-webhooks

Select the Slack channel where notifications will be sent to by default. Click
the Add Incoming WebHooks integration button to add the configuration.

Copy the Webhook URL, which we'll add to the Clarive Slack Webhook resource.

### Clarive Configuration

Navigate to the Resources admin, `Slack` family and create a resource of class
`SlackIncomingWebhook`.

Paste the Webhook URL that you copied from the Slack Configuration step.

Optionally customize the Slack bot username that will be sending the
notifications. Configure the remaining options and click Save changes.

Now create a rule or rulebook (or open an existing rule) for each event you
want to trigger a corresponding Slack action.

### Rule Designer

Drag and drop the operation `Slack Post Message` and configure at least the
`Text` field.

You can also add custom Slack post message configuration JSON, that will
be merged (the JSON takes precedence) with the `Text` field.

There are many message formatting options available. Check out
Slack's documentation for more info:

https://api.slack.com/docs/messages

https://api.slack.com/docs/message-formatting

https://api.slack.com/docs/interactive-message-field-guide

Here's an example of a highly customized message, out
of Slack's documentation. Just paste it into the `Slack Post Message` JSON field.

    {
        "text": "New comic book alert!",
        "attachments": [
            {
                "title": "The Further Adventures of Slackbot",
                "fields": [
                    {
                        "title": "Volume",
                        "value": "1",
                        "short": true
                    },
                    {
                        "title": "Issue",
                        "value": "3",
                "short": true
                    }
                ],
                "author_name": "Stanford S. Strickland",
                "author_icon": "http://a.slack-edge.com/7f18https://a.slack-edge.com/bfaba/img/api/homepage_custom_integrations-2x.png",
                "image_url": "http://i.imgur.com/OJkaVOI.jpg?1"
            },
            {
                "title": "Synopsis",
                "text": "After @episod pushed exciting changes to a devious new branch back in Issue 1, Slackbot notifies @don about an unexpected deploy..."
            },
            {
                "fallback": "Would you recommend it to customers?",
                "title": "Would you recommend it to customers?",
                "callback_id": "comic_1234_xyz",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "recommend",
                        "text": "Recommend",
                        "type": "button",
                        "value": "recommend"
                    },
                    {
                        "name": "no",
                        "text": "No",
                        "type": "button",
                        "value": "bad"
                    }
                ]
            }
        ]
    }

### Rulebook

**Clarive 7 only**

In any `do` block, use this op:

```yaml
rule: yet another slack demo
do:
   - slack_post:
       webhook: slack-webhook-1   # use the mid set to the resource you created
       text: "hello there"
```

Or for a more complex payload configuration, use a
payload data structure directly in YAML:

```yaml
rule: yet another slack demo, with a payload
do:
   - slack_post:
       webhook: slack-webhook-1   # use the mid set to the resource you created
       payload: {
            "attachments": [
                {
                    "title": "Title",
                    "pretext": "Pretext _supports_ mrkdwn",
                    "mrkdwn_in": ["text", "pretext"]
                }
            ]
        }
```

## Incoming messages from Slack

You can configure Clarive to Slack messages
as topic comments. This allows users to write text
that will be appended as a comment to a topic.

For example, let's say you have topic #43501
and want to post a comment to it. Write the following
in Slack's chat window:

    cla 43501 my comment goes here
    and can be really long

Clarive will strip out the trigger word `cla` and the
topic mid `43501` and post the rest of the message to
the topic.

Clarive uses Slack's Outgoing WebHooks interface to receive
messages. **This requires Slack to be able to see the
Clarive server**. Meaning, there has to be an internet
connection between Slack servers and your Clarive server
installation IP address and port.

### Slack Configuration

Set it up here:

https://my.slack.com/services/new/outgoing-webhook

Setup an easy trigger word, such as `cla`.


Now, add the following URL to the `URL` field:

    https://myclariveserver/plugin/cla-slack-plugin/topic-comment

Once setup, make sure to copy the `token` generated
by Slack.

### Clarive Configuration

Create a `SlackOutgoingWebhook` resource from the `Slack` class family.

Paste the token from the previous step in the `Slack Token` field.

Now head back to Slack and try writing a message with your trigger
word and an existing mid, all separated by spaces:

      [trigger_word] [mid] [text]

