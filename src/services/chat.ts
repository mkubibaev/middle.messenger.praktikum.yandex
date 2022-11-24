import { Dispatch } from 'core';
import { apiHasError, transformChat } from 'utils';
import { chatAPI, ChatDTO } from 'api';

export const getChats = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.getChats();
  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  const chats = response.map((chat: ChatDTO) => transformChat(chat));
  dispatch({ isLoading: false, chats });
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { title: string },
) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.createChat(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }

  dispatch(getChats);
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { chatId: number },
) => {
  dispatch({ isLoading: true });

  const response = await chatAPI.deleteChat(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch(getChats);
};

export const addUsersToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { users: number[], chatId: number },
) => {
  dispatch({ isLoading: true });
  const response = await chatAPI.addUsersToChat(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({ isLoading: false });
};

export const getChatUsers = async (chatId: number) => {
  return chatAPI.getChatUsers(chatId);
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { users: number[], chatId: number },
) => {
  dispatch({ isLoading: true });
  const response = await chatAPI.deleteUsersFromChat(payload);
  if (apiHasError(response)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({ isLoading: false });
};

export const getChatToken = async (chatId: number): Promise<{ token: string }> => {
  return chatAPI.getChatToken(chatId);
};
