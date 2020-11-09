# HomeStars Take-Home Assignment Frontend

## Installation and setup

Preferred version of Node is 12.14.\*.\
Preferred version of npm is 6.13.\*.

Steps to set up and run the application:

```bash
## install packages
$ npm install

## seed data (subsequent runs will delete existing data)
$ npm run seed

## start application for development
$ npm start

## run tests
$ npm test
```

Go to `localhost:3000` in the browser.

Both static html page with the UI and backend api are served from the same base url i.e. `localhost:3000`.

## Frontend features implemented

1. As a User of the web-app, I can see a list of all the channels.
2. As a User of the web-app, I can join a channel and see the history of it.
3. As a User of the web-app, I can send messages to a channel after I have joined it.
4. As a User of the web-app, I can edit my previous messages.
5. As a User of the web-app, I can delete my messages.

This set of features makes a core set of features for a chat application i.e. an MVP. Search and especially ChatBot look like enhancements.

## Possible next steps

Besides search and ChatBot.

1. Users and authentication. — In current implementation application User entity is very simple and App is initialized with a hardcoded user. This is enough to test functionality of the chat but is definitely quite limited.
2. SSE to provide live updates on new messages from the backend. — Right now if two instances of the app are running second one will not show new messages unless reloaded.
3. Pagination for messages. — Instead of loading all the messages in the channel only a portion could be loaded and additional messages could be fetched later if user scrolls far enough up.
4. Basic formatting for message content: bold, italic, underlined, strike-through, ability to insert fixed width (code) snippets.
5. Ability to upload files: image, text, video.
6. Transitions for changes in state: adding/deleting messages, change of layout of message form, switching between channels.
7. Better types reuse between frontend and backend by utilizing e.g. https://github.com/gcanti/io-ts.
