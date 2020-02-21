export const config = {
    connectMicroservice: 3001, // 微服务端口
    port: 8886,
    tokenSetTimeOut: 7200,
    http: 'http://127.0.0.1',
};

export const redisConfig = {
    name: 'user_token',
    url: 'redis://47.106.104.22:6379/4',
};

export const Api = {
    NewsApi: 'http://v.juhe.cn/toutiao/index',
    JokeApi: 'http://v.juhe.cn/joke/content/list.php',
    WxNewsApi: 'http://v.juhe.cn/weixin/query',
    DayApi: 'http://api.juheapi.com/japi/toh',
    NewsToken: '7aa639ffaa9dc8d64afd582dc6a2e5b8',
    JokeToken: '6347f3837086550c18e76e0dfe380bb3',
    WxToken: 'ffc17b0b41a5e2a77684224114054a7d',
    DayToken: '5efd5054122b5b1bbf57aec37d3ad843',
};
