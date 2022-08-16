export interface CurrentUser {
  id: number;
  name: string;
  first_name: string | null;
  email: string;
  active_group_id?: number;
  locale: {
    language: string;
  };
  active_group?: {
    id: number;
    permissions: {
      user: Array<string>;
      group: Array<string>;
      global: Array<string>;
    };
    role: {
      name: string;
    };
  };
  profile_image: {
    thumbnail_url: string;
    cdn_thumbnail_url?: string;
  };
  country: {
    id?: number;
    country_code: string;
    currency_symbol: string;
  };
  phone?: string;
  permissions?: {
    user: Array<string>;
    group: Array<string>;
    global: Array<string>;
  };
}

export interface IdentityState {
  currentUser: CurrentUser | null;
}

export interface LoginByEmailRequest {
  email: string;
  password: string;
}

export interface LoginByEmailResponse {
  access_token: string;
  user: CurrentUser;
}

export interface AuthOwner {
  id: number;
  active_group_id?: number;
  active_group?: {
    id: number;
  };
}

export interface AuthGroup {
  id: number;
}

export interface AuthPermission {
  permissions: Array<string>;
  roles?: Array<string>;
  bypass?: boolean;
  owner?: AuthOwner | Array<AuthOwner>;
  group?: AuthGroup | Array<AuthGroup>;
}

export interface SwitchCountry {
  countryId: string;
}

export type SwitchCountryResponse = Record<string, any>;

export interface SwitchLanguage {
  language: string;
}

export type SwitchLanguageResponse = Record<string, any>;
