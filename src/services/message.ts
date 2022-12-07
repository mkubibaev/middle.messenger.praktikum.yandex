import { Dispatch, DispatchStateHandler } from 'core';
import { chatAPI } from 'api';
import { apiHasError, WS_ENDPOINT } from 'utils';
import { logout } from './auth';
import { ConnectToChatSocketPayload } from './types';

export const connectToChatSocket: DispatchStateHandler<ConnectToChatSocketPayload> = async (
  dispatch,
  state,
  payload,
) => {
  try {
    const tokenResponse = await chatAPI.getChatToken(payload.chatId);
    if (apiHasError(tokenResponse.data)) {
      dispatch(logout);
    }
    const { token } = tokenResponse.data;
    const userId = state.user?.id;
    const socket = new WebSocket(`${WS_ENDPOINT}/chats/${userId}/${payload.chatId}/${token}`);
    dispatch({ chatSocket: socket });

    socket.addEventListener('open', () => {
      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );

      setInterval(() => {
        socket.send(
          JSON.stringify({
            type: 'ping',
          }),
        );
      }, 8000);
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          const newMessages = data.reverse();
          dispatch({ messages: newMessages });
        } else {
          if (data.type === 'pong') {
            return;
          }
          dispatch({ messages: [...window.store.getState().messages, data] });
        }
        payload.scroll();
      } catch (err) {
        console.log(err);
      }
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });
  } catch (err) {
    console.log(err);
  }
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
