import { RootState } from '../stores';
import { refreshToken } from '../stores/slices/auth.slice';
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/dist/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://nodejs-mobilestore.vercel.app/api/',
  // baseUrl: "http://localhost:5000/api/",
  prepareHeaders: (headers, { getState }) => {
    const profile = (getState() as RootState).auth;
    if (profile.user) {
      headers.set('Authorization', `Bearer ${profile.accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    (result.error as { originalStatus: number }).originalStatus === 403
  ) {
    const profile = (api.getState() as RootState).auth;
    const responseRefresh = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
        body: { token: profile.refreshToken },
      },
      api,
      extraOptions,
    );
    const resultRefreshData = responseRefresh.data as any;
    if (resultRefreshData) {
      api.dispatch(refreshToken(resultRefreshData.accessToken));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(refreshToken(''));
    }
  }
  return result;
};
