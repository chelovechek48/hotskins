import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      images: import.meta.glob('@images/*.*', { eager: true }),
      user: {
        authorized: true,
        login: 'login',
        password: 'admin',
        nickname: 'MegaNagibator',
        avatar: {
          'image/jpeg': {
            '1x': 'user-avatar.jpg',
          },
          alt: 'аватарка steam',
        },
      },
    };
  },
});

export default store;
