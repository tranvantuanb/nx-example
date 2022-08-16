import { useSelector } from 'react-redux';

export const useGetConfigEnv = () => {
  const configEnv = useSelector((state: any) => state.configEnv);
  return {
    WHOLESALE_FE_URL: configEnv?.wsFeUrl,
    CAPTAIN_URL: configEnv?.captainUrl,
    WHOLESALE_OAUTH_CLIENT_ID: configEnv?.wsOauthClientId,
    WHOLESALE_OAUTH_CLIENT_SECRET: configEnv?.wsOauthLientSecret,
    WHOLESALE_OAUTH_USERNAME: configEnv?.wsOauthUserName,
    WHOLESALE_OAUTH_PASSWORD: configEnv?.wsOauthPassWord,
    ALGOLIA_APP_ID: configEnv?.algoliaAppId,
    ALGOLIA_API_KEY: configEnv?.algoliApiKey,
    ALGOLIA_INDEX: configEnv?.algoliaIndex,
    STRIPE_API_KEY_BUY_FLOW: configEnv?.stripeApiKeyBuyFlow,
    WHATSAPP: configEnv?.whatsapp,
  };
};
