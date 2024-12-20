'use client'

import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react'

interface UserState {
  accessToken: string | null
}

interface UserAction {
  type: 'SET_USER_DATA'
  payload: UserState
}

const initialState: UserState = {
  accessToken: null
}

const UserContext = createContext<{
  state: UserState
  dispatch: Dispatch<UserAction>
}>({
  state: initialState,
  dispatch: () => undefined,
})

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        accessToken: action.payload.accessToken
      }
    default:
      return state
  }
}

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext)
