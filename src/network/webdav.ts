import {createClient, WebDAVClient} from 'webdav';

interface Webdav {
  path: string;
  username: string;
  password: string;
  client: WebDAVClient;
}

class WebdavClients {
  private client: {[key: string]: Webdav} = {};

  async createClient(
    nickname: string,
    path: string,
    username: string,
    password: string,
  ) {
    const newClient = await createClient(path, {username, password});
    this.client[nickname] = {path, username, password, client: newClient};
  }

  async isDuplicated(path: string, username: string, password: string) {
    const check = Object.values(this.client).filter(
      res =>
        path === res.path &&
        username === res.username &&
        password === res.password,
    );

    if (check) {
      return true;
    }

    return false;
  }

  async isDuplicatedNickname(nickname: string) {
    return Object.keys(this.client).includes(nickname);
  }
}

export default WebdavClients;
