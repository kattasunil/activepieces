import { frameRegisterTrigger } from "./register-trigger";

export const triggers = [
  {
    name: 'project_created',
    eventType: "project.created",
    displayName: 'Project Created',
    description: 'Triggered when a new project is created.',
    sampleData: {
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "active": true,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "deleted_at": "2019-08-24T14:15:22Z",
      "events": [
        "project.created"
      ],
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "inserted_at": "2019-08-24T14:15:22Z",
      "name": "string",
      "project_id": "405d8375-3514-403b-8c43-83ae74cfe0e9",
      "secret": "string",
      "team_id": "810007d0-bec5-486c-b5d1-28fcd8a079ba",
      "updated_at": "2019-08-24T14:15:22Z",
      "url": "string"
    }
  },
  {
    name: 'asset_created',
    eventType: "asset.created",
    displayName: 'Asset Created',
    description: 'Triggered when a new asset is created.',
    sampleData: {
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "active": true,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "deleted_at": "2019-08-24T14:15:22Z",
      "events": [
        "asset.created"
      ],
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "inserted_at": "2019-08-24T14:15:22Z",
      "name": "string",
      "project_id": "405d8375-3514-403b-8c43-83ae74cfe0e9",
      "secret": "string",
      "team_id": "810007d0-bec5-486c-b5d1-28fcd8a079ba",
      "updated_at": "2019-08-24T14:15:22Z",
      "url": "string"
    }
  },
  {
    name: 'comment_created',
    eventType: "comment.created",
    displayName: 'Comment Created',
    description: 'Triggered when a new comment is created.',
    sampleData: {
      "account_id": "449e7a5c-69d3-4b8a-aaaf-5c9b713ebc65",
      "active": true,
      "app_id": "affd1d10-9538-4fc8-9e0b-4594a28c1335",
      "deleted_at": "2019-08-24T14:15:22Z",
      "events": [
        "comment.created"
      ],
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "inserted_at": "2019-08-24T14:15:22Z",
      "name": "string",
      "project_id": "405d8375-3514-403b-8c43-83ae74cfe0e9",
      "secret": "string",
      "team_id": "810007d0-bec5-486c-b5d1-28fcd8a079ba",
      "updated_at": "2019-08-24T14:15:22Z",
      "url": "string"
    }
  }
].map((props) => frameRegisterTrigger(props));
