class Api {
  constructor() {
    this.apiUrl = 'http://localhost:3005/meetings';
  }

  load() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this._fetch(options);
  }

  update(data) {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this._fetch(options);
  }

  filter(name, value) {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const additionalPath = `?${name}_like=${value}`;
    return this._fetch(options, additionalPath);
  }

  _fetch(options, path = '') {
    return fetch(this.apiUrl + path, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error('Network error!');
    });
  }
}

export default Api;
