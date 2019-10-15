| [master](https://github.com/KenticoDocs/kontent-docs-index-sync/tree/master) | [develop](https://github.com/KenticoDocs/kontent-docs-index-sync/tree/develop) |
|:---:|:---:|
| [![Build Status](https://travis-ci.com/KenticoDocs/kontent-docs-index-sync.svg?branch=master)](https://travis-ci.com/KenticoDocs/kontent-docs-index-sync/branches) [![codebeat badge](https://codebeat.co/badges/22a5efee-1d1a-494f-a485-986a5d92fe94)](https://codebeat.co/projects/github-com-kenticodocs-kontent-docs-index-sync-master) | [![Build Status](https://travis-ci.com/KenticoDocs/kontent-docs-index-sync.svg?branch=develop)](https://travis-ci.com/KenticoDocs/kontent-docs-index-sync/branches) [![codebeat badge](https://codebeat.co/badges/279abd8a-2d9c-4f4e-b939-1a8a129dab15)](https://codebeat.co/projects/github-com-kenticodocs-kontent-docs-index-sync-develop) |

# Kentico Kontent Documentation - Index sync

Backend service for [Kentico Kontent](https://docs.kontent.ai/) documentation portal, which utilizes Kentico Kontent as a source of its data.

The service is responsible for receiving split items from Kentico Kontent to records and storing them in the [Algolia](https://www.algolia.com/) index. The service is triggered when a blob is stored in the blob storage by the [Tutorials Search](https://github.com/KenticoDocs/kontent-docs-tutorial-search) service.

## Overview

1. This project is a TypeScript Azure Functions application.

2. It is subscribed to an Azure Event Grid topic of the Blob storage, which creates an event when a blob is created. Each event contains the url of the blob that was created.

3. The Index Sync service fetches the blob, sanitizes the content of the records and stores them in the Algolia index.

## Setup

### Prerequisites

1. Node (+yarn) installed
2. Visual Studio Code installed
3. Subscriptions on MS Azure and Algolia

### Instructions

1. Open Visual Studio Code and install the prerequisites according to the [following steps](https://code.visualstudio.com/tutorials/functions-extension/getting-started).
2. Log in to Azure using the Azure Functions extension tab.
3. Clone the project repository and open it in Visual Studio Code.
4. Run `yarn install` in the terminal.
5. Set the required keys.
6. Deploy to Azure using Azure Functions extension tab, or run locally by pressing Ctrl + F5 in Visual Studio Code.

#### Required Keys
* `Azure.StorageAccountName` - The name of the storage account in Azure
* `Azure.StorageKey` - The storage key for the Azure storage account
* `Search.ApiKey` - Algolia admin API key
* `Search.AppId` - Algolia application ID
* `Search.IndexName` - Index name in Algolia application

## Testing
Run `yarn run test` in the terminal.

## How To Contribute
Feel free to open a new issue where you describe your proposed changes, or even create a new pull request from your branch with proposed changes.

## Licence
All the source codes are published under MIT licence.
