
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
    import { OAuth2GrantType } from '@activepieces/shared';
    import { getInvoices } from './lib/actions/get-invoices';
    import { getProjects } from './lib/actions/get-projects';
    import { getTasks } from './lib/actions/get-tasks';
    import { getClients } from './lib/actions/get-clients';
    import { getEstimates } from './lib/actions/get-estimates';
    import { getExpenses } from './lib/actions/get-expenses';

    export const harvestAuth = PieceAuth.OAuth2({
      required: true,
      grantType: OAuth2GrantType.AUTHORIZATION_CODE,
      authUrl: 'https://id.getharvest.com/oauth2/authorize',
      tokenUrl: `https://id.getharvest.com/api/v2/oauth2/token`,
      scope: ['harvest:all'],
    });

    export const harvest = createPiece({
      displayName: "Harvest",
      auth: harvestAuth,
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://cdn.activepieces.com/pieces/harvest.png",
      authors: ["drowe"],
      actions: [getClients, getEstimates, getExpenses, getInvoices, getProjects, getTasks],
      triggers: [],
    });
    