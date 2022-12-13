<h1 align="center"><a href="https://paguiar.link/jarvis-does-trello">Jarvis Does Trello®</a></h1>

> **Warning**: This project does not intend to be a business-ready solution. Use it at your own risk.

<p align="center">
    <br>
  <a href="https://www.dreamstime.com/royalty-free-stock-photos-funny-robot-waiter-3d-illustration-image19350308">
    <img src="https://thumbs.dreamstime.com/z/funny-robot-waiter-3d-illustration-19350308.jpg" width="120px" height="120px"/>
  </a>
  <br><br>
    Proof of Concept of how powerful Trello® can be once you automate your workflow
  <br>
</p>

<br>

## Introduction

Trello is nothing more than a platform where you can create digital boards of messages, which are organized into columns called “lists”, which in turn hold the messages in stickers called “cards”. Boards can be grouped into “workspaces”, which are generally used to represent the departments of the companies that use it.

Trello takes advantage of the Agile Principles by facilitating access to information on ongoing tasks, by promoting transparency, and by streamlining their completion through the asynchronous collaboration of work colleagues.

## Case Study

However, as of today [2022-12-10] there isn’t any well-established software solutions to automate basic tasks on Trello. For example, moving cards between boards or archiving lists conditionally, which really is a nuisance in the day-to-day for Trello users.

So the question this project tried to answer was:

Is there a way to circumvent the limitations of Trello for my use case, or is it better to just build a similar platform from scratch?

## Results

Here are some considerations gathered over the course of one year from the project that guided my conclusion:

Pros:

- Free, Developer-friendly API: it’s fairly easy to get up and running with the API since there are examples and concise definitions of the parameters of each HTTP endpoint in its API documentation;
- Data consistency across clientele: no matter how many lists there are in a board, the changes in them are reflected invariably across the devices of all those who happen to be viewing that board. It also has built-in autosave features which allows the users to interact with the board offline and the changes will be synchronized with the cloud once the user is online;
- User-friendly UI: the concise, intuitive UX/UI of Trello in comparison to similar platforms played a major role in its adoption process by non-tech colleagues.

Cons:

- Data duplication across boards: There’s no official way for regular users to be able to track the whereabouts of a card unless you query all the cards of all the boards of all the lists available in a workspace;
- Limited user permissions: the only way to make a board truly read-only is by setting its visibility to public, which is something that’s implausible in the majority of projects. In other words, any user within the organization can join the board and strike havoc by changing the names or lists, by deleting them, by reordering them, etc., which will break workflow integrations even when done by accident;
- Limited Monitoring Capabilities: any member of a board can doctor both the name and the description of any of the cards and there will be no traces of who did it, when or how to recover it. This is a deal breaker for virtually all use cases, especially since there isn’t even a paid version of Trello that fixes this issue.

## Conclusion

I concluded in my use case, building an in-house solution is a better fit.

> **Note**: In either case, I might rewrite this POC eventually in a way that's production-ready, so those who just need a ready-to-go solution for their Trello workflow don't have to reinvent the wheel.

## Disclaimer

We are not affiliated, associated, authorized, endorsed by or in any way officially connected to Trello, Inc. (www.trello.com).
