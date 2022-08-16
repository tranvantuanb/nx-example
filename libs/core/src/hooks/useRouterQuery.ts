import { useRouter } from 'next/router';

export const useRouterQuery = () => useRouter()?.query;
