export const debounce = (fn, delay) => {
    var timer; // 维护一个 timer
    return function() {
        var _this = this; // 取debounce执行作用域的this
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay);
    };
};

export const isFunction = f =>
['[object Function]', '[object AsyncFunction]'].indexOf(Object.prototype.toString.call(f)) > -1;