let Minilog = require('minilog');

export class Logger {

    private _name: string;

    private _logger: Minilog;

    constructor(name: string, logLevel: LogLevel = LogLevel.INFO) {
        this._name = name;
        this._logger = Minilog(name);
        let levelFilter = new Minilog.Filter();
        levelFilter.allow(name, logLevel.level);
        Minilog.enable();
        Minilog.pipe(levelFilter);
    }

    debug(msg: any) {
        this._logger.debug(msg);
    }

    info(msg: any) {
        this._logger.info(msg);
    }

    log(msg: any) {
        this._logger.log(msg);
    }

    warn(msg: any) {
        this._logger.warn(msg);
    }

    error(msg: any) {
        this._logger.error(msg);
    }

    public get name(): string {
        return this._name;
    }
}

export class LogLevel {

    private _level: string;


    constructor(level: string) {
        this._level = level;
    }

    public get level(): string {
        return this._level;
    }

    static DEBUG = new LogLevel('debug');
    static INFO = new LogLevel('info');
    static LOG = new LogLevel('log');
    static WARN = new LogLevel('warn');
    static ERROR = new LogLevel('error');
}