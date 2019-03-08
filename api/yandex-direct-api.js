const axios = require('axios');

// Yandex Direct API domain.
const API = 'https://api.direct.yandex.com/';
// Sandbox Yandex Direct API url.
const SANDBOX_API = 'https://api-sandbox.direct.yandex.com/';
// Default configuration.
const DEFAULT_CONF = {
    live: false,
    sandbox: false,
    locale: 'ru'
};

let YandexDirectApi = function(options = {}) {
    if (!(this instanceof YandexDirectApi))
        return new YandexDirectApi(options);

    options = Object.assign(DEFAULT_CONF, options);

    this.url = this.__constructUrl(options);
    this.token = options.token;
    this.options = options;
    this.locale = options.locale;

    return this;
};

YandexDirectApi.prototype.call = async function(service, method, params) {
    let config = {
        headers: {'Authorization': `Bearer ${this.token}`}
    };

    return await axios.post(this.url + '/' + service, {
        method: method,
        params: params
    }, config);
};

YandexDirectApi.prototype.__constructUrl = (options = {}) => {
    let url = options.sandbox ? SANDBOX_API : API;
    if (options.live) url += 'live/';
    url += 'json/v5/';
    if (options.url) url = options.url;
    return url;
};

module.exports = YandexDirectApi;
