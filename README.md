# D&D5e Solid App

A small [Solid app](https://solidproject.org/) that allows you to manage your 
[Dungeons & Dragons 5th edition](https://dnd.wizards.com/) content. Using the power of Solid it allows you to control 
where to store the data you create for the app.

**Note:** This is an experimental app, and no guarantees are made in terms of support and updates.

## Features

- [Characters](#characters)
  - [Turn management](#turn-management)
  - [Notes](#notes)
- [Content management](#content-management)
  - [Core rules](#core-rules) (in progress)
  - [Sources](#sources) (in progress)
  - [Skills](#skills)
  - [Items](#items)
  - [Feats](#feats)
  - [Spells](#spells)
  - [Races](#races)
  - [Monsters](#monsters)
  - [Classes](#classes)
  - [Backgrounds](#backgrounds)
  - [Characters](#characters)
  - [Notes](#notes)
- [App properties](#app-properties)
  - [Share system](#share-system)
  - [Search](#search)
  - [Linked data vocabularies](#linked-data-vocabularies) (in progress)
  - [Translations](#translations) (done)
  - [Error system](#error-system) (done)
  - [Styling system](#styling-system)
  - [Dark mode](#dark-mode)
  - [Offline capabilities](#offline-capabilities)
  - [Installable](#installable)
  - [Unit test system](#unit-test-system) (done)
  - [CI/CD](#cicd) (done)
  - [Backup and restore data](#backup-and-restore-data)

### Characters

In the center of any D&D game is the characters the players create and use to interact with the fantasy world.

With this app you can create and manage characters and use it in your games to manage your abilities and available 
actions.

#### Turn management

An integral part of the D&D experience is the encounter systems, and for many the combat encounters are where the 
rules shine through. Although D&D has been significantly simplified over the years, there can still be a lot to 
remember, and this app aims to ease that part by offering a turn management system that list your available 
interactions in combat. 

#### Notes

Playing D&D can span multiple sessions over a long time, even years. These sessions are usually categorized into 
campaigns, and it can be hard to remember everything that happens. This app also allows players to jolt down notes, 
either by yourself or in collaboration with other players.
  
### Content Management

At the core of the app is managing various content that offered with the D&D5e ruleset, with focus on character 
management. There are many apps that handle this already, but this app is built on Solid with all the advantages 
that bring.

Although the focus of this app is _content management of characters_, it requires a lot of background material. So 
this app also allows you to manage that material and share it with your friends and other groups that might want to 
reuse your work.

The data is stored in such a way that other apps can also make use of it. That doesn't mean all the data is public; 
with Solid you decide what access you want to grant others, whether that be only for yourself, your private group 
of friends, or the whole world.

This interoperability between apps allow more apps to reuse data and create different experiences. Another app could 
for example reuse the character data created by this app to allow players to form groups and play their characters 
in a virtual setting.

#### Core rules

**Status:** In progress

D&D5e has a lot of rules that lays the foundation for the game, such as ability scores, saving throws, time system, 
etc. All of this content will be stored in Turtle, an RDF abstraction that's used in Linked Data-applications, such 
as Solid applications.

#### Sources

**Status:** In progress

Sources are a core concept of the D&D5e app that bundles the various content that's available. An example of sources 
are books, although interpreted in Linked Data format so that it's machine-readable.

#### Skills

Skills represent the ability-score dependent abilities characters are able to perform, such as Athletics, Stealth, 
and Animal Handling.

#### Items

Items represent things characters can interact with, such as weapons, armors, and other equipment. 

#### Feats

Feats are the optional characteristics that players can use to customize their characters even further, such as 
Crossbow Expert, Mage Slayer, and Lucky.

#### Spells

Spells are magical effects that characters and monsters are able to cast or otherwise make use of.

#### Races

Races are the various races that players can choose for their characters, such as Humans, Elves, and Dragonborns.

#### Monsters

Monsters is a set of creatures that players can interact with. For this app we'll focus on monsters that are common 
companions to players.

#### Classes

Classes define the unique abilities characters can attain, and guides the roles they play.

#### Backgrounds

With backgrounds players can further customize their characters and gain additional skills and abilities.

### App properties

This app is designed with D&D5e in mind, but many of its underlying features and systems are generic to apps and app 
development in general.

#### Share system

An important part of the app is the ability to share your data with others. It leverages the authentication and 
authorization features in Solid to make sure that your data is as private as you need it to be, and that you only 
share it with those you want.

#### Search

With all the content available in this app you need a way to quickly find what you need.

#### Linked data vocabularies

**Status:** In progress

An integral part of Solid is its use of RDF to describe the data. With RDF you get Linked Data, and with Linked 
Data you open up your data in an extensible way that allows app to be interoperable. 

#### Translations

**Status:** Done

D&D5e is played across the whole world, and in order to be accessible it's important to be able to consume the 
content in a language players are comfortable with.

This app will focus on english as the core language, but all text is localized so that it can theoretically be 
represented in any language.

All localizations are structured in public Turtle files, and have their own URLs. We use
[Fluent](https://www.projectfluent.org/) to transform text into localized messages.

#### Error system

**Status:** Done

Any app is bound to encounter errors at some point, so it's important to facilitate these errors in a manner that 
empower users to understand how to proceed.

Errors are also structured into public Turtle files, can be referenced by URLs, and be localized.

#### Styling system

To ensure a consistent design we're considering using [Tailwind CSS](https://tailwindcss.com/).

#### Responsive design

Everything is designed with mobile first in mind, making sure that everything looks good on small screens, and then 
making sure that they expand gracefully on larger screens.

#### Dark mode

Some users prefer a dark mode design when interacting with the app.

#### Offline capabilities

Not all players can rely on stable online connections, or connection might simply not be available at all. The users 
can opt in to store all resources locally, so that they can be accessed when offline.

#### Installable

Although a web app at its core, we want to allow users to install the app as a
[Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

#### Unit test system

**Status:** Done

In order to avoid regression bugs we write unit tests thoroughly.

#### CI/CD

**Status:** Done

The code for this app can be automatically integrated and deployed to a given website.  

#### Backup and restore data

As the amount of data grows it can be useful to back it up to ensure it isn't lost if anything goes wrong.
