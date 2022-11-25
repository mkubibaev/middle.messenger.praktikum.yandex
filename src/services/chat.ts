import { Dispatch } from 'core';
import { apiHasError, transformChat } from 'utils';
import { chatAPI, ChatDTO } from 'api';

export const getChats = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });

    const response = await chatAPI.getChats();
    if (apiHasError(response)) {
      dispatch({ isLoading: false });
      return;
    }
    const chats = response.map((chat: ChatDTO) => transformChat(chat));
    dispatch({ isLoading: false, chats });
  } catch (err) {
    console.log(err);
  }
};

export const createChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { title: string },
) => {
  try {
    dispatch({ isLoading: true });

    const response = await chatAPI.createChat(payload);
    if (apiHasError(response)) {
      dispatch({ isLoading: false });
      return;
    }

    dispatch(getChats);
  } catch (err) {
    console.log(err);
  }
};

export const deleteChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { chatId: number },
) => {
  try {
    dispatch({ isLoading: true });

    const response = await chatAPI.deleteChat(payload);
    if (apiHasError(response)) {
      dispatch({ isLoading: false });
      return;
    }
    dispatch(getChats);
  } catch (err) {
    console.log(err);
  }
};

export const addUsersToChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { users: number[], chatId: number },
) => {
  try {
    dispatch({ isLoading: true });
    const response = await chatAPI.addUsersToChat(payload);
    if (apiHasError(response)) {
      dispatch({ isLoading: false });
      return;
    }
    dispatch({ isLoading: false });
  } catch (err) {
    console.log(err);
  }
};

export const getChatUsers = (chatId: number) => {
  try {
    return chatAPI.getChatUsers(chatId);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const deleteUserFromChat = async (
  dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: { users: number[], chatId: number },
) => {
  try {
    dispatch({ isLoading: true });
    const response = await chatAPI.deleteUsersFromChat(payload);
    if (apiHasError(response)) {
      dispatch({ isLoading: false });
      return;
    }
    dispatch({ isLoading: false });
  } catch (err) {
    console.log(err);
  }
};

export const getChatToken = (chatId: number) => {
  try {
    return chatAPI.getChatToken(chatId);
  } catch (err) {
    console.log(err);
    return err;
  }
};
