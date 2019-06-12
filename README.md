| [master](https://github.com/Kentico/kentico-cloud-docs-search/tree/master) | [develop](https://github.com/Kentico/kentico-cloud-docs-search/tree/develop) |
|:---:|:---:|
| [![Build Status](https://travis-ci.com/KenticoDocs/cloud-docs-index-sync.svg?branch=master)](https://travis-ci.com/KenticoDocs/cloud-docs-index-sync/branches) [![codebeat badge](https://codebeat.co/badges/12ac26ae-0819-4a03-b8b6-894a1b24fe71)](https://codebeat.co/projects/github-com-kenticodocs-cloud-docs-index-sync-master) | [![Build Status](https://travis-ci.com/KenticoDocs/cloud-docs-index-sync.svg?branch=develop)](https://travis-ci.com/KenticoDocs/cloud-docs-index-sync/branches) [![codebeat badge](https://codebeat.co/badges/e9135692-0025-4147-9718-8bf9fcfe7e49)](https://codebeat.co/projects/github-com-kenticodocs-cloud-docs-index-sync-develop) |

# Kentico Cloud Documentation - Index sync

Backend service for [Kentico Cloud](https://docs.kenticocloud.com/)  documentation portal, which utilizes Kentico Cloud as a source of its content.

The service is responsible for receiving split items from Kentico Cloud to records and storing them in the [Algolia](https://www.algolia.com/) index. The service is triggered when a blob is stored in the blob storage by the [Tutorials search](https://github.com/KenticoDocs/cloud-docs-tutorial-search) service.

## Overview

1. This project is a TypeScript Azure Functions application.

2. It is subscribed to an Azure Event Grid topic of the Blob storage, which creates an event when a blob is created. Each event contains the url of the blob that was created.

3. The Index sync service fetches the blob, sanitizes the content of the records and stores them in the Algolia index.

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
