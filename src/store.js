import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      images: import.meta.glob('@images/**/*.*', { eager: true }),
      user: {
        authorized: JSON.parse(localStorage.getItem('authorized')) || false,
        login: 'login',
        password: 'admin',
        nickname: 'MegaNagibator',
        avatar: {
          'image/png': {
            '1x': 'userdata/user-avatar.png',
          },
          alt: 'аватарка steam',
        },
      },
      toRubFormat(number) {
        const formattedPrice = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
        })
          .format(number);
        return formattedPrice;
      },
    };
  },
});

export default store;
