const req = require.context('./', true, /.jsx/);
req.keys().forEach(function(key) {
    if (/^\.\/index.jsx/.test(key)) {
        return;
    }
    let info = /^\.\/([a-z0-9-]+)\/index\.jsx$/i.exec(key);
    if (!info) {
        return;
    }
    exports[info[1]] = req(key).default || req(key);
});
