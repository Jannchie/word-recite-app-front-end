export default {
  user: {
    username: undefined,
    password: undefined,
    exp: undefined,
    uid: undefined,
    myWordList: []
  },
  searchText: "",
  state: {
    login: undefined,
    needUpdateMyWordList: false
  },
  wordList: [],
  alert: {
    message: undefined,
    type: undefined,
    display: false
  },
  recite: {
    words: []
  },
  settings: {
    dark: false,
    autoPlayAudio: true,
    wordsOfRound: 20
  }
};
