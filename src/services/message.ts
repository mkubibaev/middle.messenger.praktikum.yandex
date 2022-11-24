import { Dispatch } from 'core';
import { chatAPI } from 'api';
import { apiHasError } from '../utils';
import { logout } from './auth';

export const connectToChatSocket = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  payload: { chatId: number, scroll: () => void },
) => {
  const tokenResponse = await chatAPI.getChatToken(payload.chatId);
  if (apiHasError(tokenResponse)) {
    dispatch(logout);
  }
  const { token } = tokenResponse;
  const userId = state.user?.id;
  const socket = new WebSocket(`${process.env.WS_ENDPOINT}/chats/${userId}/${payload.chatId}/${token}`);
  dispatch({ chatSocket: socket });

  socket.addEventListener('open', () => {
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      }),
    );
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    if (Array.isArray(data)) {
      const newMessages = data.reverse();
      dispatch({ messages: newMessages });
    } else {
      dispatch({ messages: [...window.store.getState().messages, data] });
    }
    payload.scroll();
  });

  socket.addEventListener('close', (event) => {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }
    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  });
};

export const sendMessage = (
  _dispatch: Dispatch<AppState>,
  _state: AppState,
  payload: string,
) => {
  if (!_state.chatSocket) {
    return;
  }
  _state.chatSocket.send(JSON.stringify({
    content: payload,
    type: 'message',
  }));
};
