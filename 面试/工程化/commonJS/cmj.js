console.log(arguments.length); // 5个参数，就是下面的_run
console.log(exports === module.exports);
console.log(require);
// console.log(module);
console.log(__filename);
console.log(__dirname);

/**
 * 伪代码
 */
function require(path) {
    if('该模块有缓存吗') {
        return '缓存结果'
    }

    function _run(exports, require, module, __filename, __dirname) {
        // 模块代码放这里
    }

    var module = {
        exports:  {}
    }

    _run.call(
        module.exports, //this
        module.exports,
        require,
        module,
        '模块路径',
        '模块所在目录'
    )

    '把 module.exports 加入到缓存'

    return module.exports;

}