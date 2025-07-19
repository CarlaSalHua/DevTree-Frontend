export interface RegisterUser {
  name: string;
  email: string;
  handle: string;
  password: string;
  password_confirmation: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export type User = {
    handle: string
    name: string
    email: string
    _id: string
    description: string
    image: string
    links: string
    views: number
}

export type UserHandle = Pick<User, 'description' | 'handle' | 'image' |'links' | 'name' | 'views'>

export type ProfileForm = Pick<User, 'handle' | 'description'>

export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}
export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>