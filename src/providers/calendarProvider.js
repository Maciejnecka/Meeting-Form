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

  delete(meetingId) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${meetingId}`;
    return this._fetch(options, url);
  }

  _fetch(options, path = '') {
    const normalizedPath = `/${path}`.startsWith('/') ? `/${path}` : `/${path}`;

    return fetch(this.apiUrl + normalizedPath, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`Error ${resp.status}: ${resp.statusText}`);
    });
  }
}

export default Api;
