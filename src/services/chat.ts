import { Dispatch, DispatchStateHandler } from 'core';
import { apiHasError, transformChat } from 'utils';
import { chatAPI, ChatDTO } from 'api';
import { AddUsersToChatPayload, DeleteUsersFromChatPayload } from './types';

export const getChats = async (dispatch: Dispatch<AppState>) => {
  try {
    dispatch({ isLoading: true });

    const response = await chatAPI.getChats();
    if (apiHasError(response.data)) {
      dispatch({ isLoading: false });
      return;
    }
    const chats = response.data.map((chat: ChatDTO) => transformChat(chat));
    dispatch({ isLoading: false, chats });
  } catch (err) {
    console.log(err);
  }
};

export const createChat: DispatchStateHandler<{ title: string }> = async (
  dispatch,
  _state,
  payload,
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

export const deleteChat: DispatchStateHandler<{ chatId: number }> = async (
  dispatch,
  _state,
  payload,
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

export const addUsersToChat: DispatchStateHandler<AddUsersToChatPayload> = async (
  dispatch,
  _state,
  payload,
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
    return { data: [] };
  }
};

export const deleteUserFromChat: DispatchStateHandler<DeleteUsersFromChatPayload> = async (
  dispatch,
  _state,
  payload,
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
