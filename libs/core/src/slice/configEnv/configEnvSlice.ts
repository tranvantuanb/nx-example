import { createSlice } from '@reduxjs/toolkit';

interface ConfigEnvState {
  wsFeUrl: string | undefined;
  echoKey: string | undefined;
  echoHost: string | undefined;
  echoPort: string | undefined;
  wsOauthClientId: string | undefined;
  wsOauthLientSecret: string | undefined;
  wsOauthUserName: string | undefined;
  wsOauthPassWord: string | undefined;
  algoliaAppId: string | undefined;
  algoliApiKey: string | undefined;
  captainUrl: string | undefined;
  stripeApiKeyBuyFlow: string | undefined;
  whatsapp: string | undefined;
  algoliaIndex: string | undefined;
}

export const configEnvSlice = createSlice({
  name: 'core/configEnv',
  initialState: {} as ConfigEnvState,
  reducers: {
    updateConfigEnv: (state, action) => {
      const country = action.payload;
      switch (country) {
        case 'MY':
          state.wsFeUrl = `${process.env['MY_WHOLESALE_FE_URL']}`;
          state.wsOauthClientId = `${process.env['MY_WHOLESALE_OAUTH_CLIENT_ID']}`;
          state.wsOauthLientSecret = `${process.env['MY_WHOLESALE_OAUTH_CLIENT_SECRET']}`;
          state.wsOauthUserName = `${process.env['MY_WHOLESALE_OAUTH_USERNAME']}`;
          state.wsOauthPassWord = `${process.env['MY_WHOLESALE_OAUTH_PASSWORD']}`;
          state.algoliaAppId = `${process.env['MY_ALGOLIA_APP_ID']}`;
          state.algoliApiKey = `${process.env['MY_ALGOLIA_API_KEY']}`;
          state.captainUrl = `${process.env['MY_CAPTAIN_URL']}`;
          state.stripeApiKeyBuyFlow = `${process.env['MY_STRIPE_API_KEY_BUY_FLOW']}`;
          state.whatsapp = `${process.env['MY_WHATSAPP']}`;
          state.algoliaIndex = `${process.env['MY_ALGOLIA_INDEX']}`;
          break;
        default:
      }
    },
  },
});

export const { updateConfigEnv } = configEnvSlice.actions;

export default configEnvSlice.reducer;
