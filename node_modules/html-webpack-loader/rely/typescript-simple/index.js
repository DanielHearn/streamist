"use strict";
var fs = require("fs");
var os = require("os");
var path = require("path");
var assert = require("assert");
var ts = require("typescript");
var FILENAME_TS = 'file.ts';
var FILENAME_TSX = 'file.tsx';
function tss(code, options) {
    if (options) {
        return new tss.TypeScriptSimple(options).compile(code);
    }
    else {
        return defaultTss.compile(code);
    }
}
(function (tss) {
    var TypeScriptSimple = /** @class */ (function () {
        /**
         * @param {ts.CompilerOptions=} options TypeScript compile options (some options are ignored)
         * @param {boolean=} doSemanticChecks Throw if TypeScript semantic error found (default: true)
         * @constructor
         */
        function TypeScriptSimple(options, doSemanticChecks) {
            if (options === void 0) { options = {}; }
            if (doSemanticChecks === void 0) { doSemanticChecks = true; }
            this.doSemanticChecks = doSemanticChecks;
            this.service = null;
            this.files = {};
            options = Object.assign({}, options);
            if (options.target == null) {
                options.target = ts.ScriptTarget.ES5;
            }
            if (options.module == null) {
                options.module = ts.ModuleKind.None;
            }
            if (options.sourceMap) {
                options.sourceMap = false;
                options.inlineSourceMap = true;
            }
            this.options = options;
        }
        /**
         * @param {string} code TypeScript source code to compile
         * @param {string=} fileName Only needed if you plan to use sourceMaps.
         *    Provide the complete filePath relevant to you
         * @return {string} The JavaScript with inline sourceMaps if sourceMaps were enabled
         * @throw {Error} A syntactic error or a semantic error (if doSemanticChecks is true)
         */
        TypeScriptSimple.prototype.compile = function (code, fileName) {
            if (!fileName) {
                if (this.options.jsx === ts.JsxEmit.Preserve) {
                    fileName = FILENAME_TSX;
                }
                else if (this.options.jsx === ts.JsxEmit.React) {
                    fileName = FILENAME_TSX;
                }
                else {
                    fileName = FILENAME_TS;
                }
            }
            if (!this.service) {
                this.service = this.createService();
            }
            var file = this.files[fileName];
            if (file) {
                file.text = code;
                file.version++;
            }
            else {
                this.files[fileName] = { version: 0, text: code };
            }
            return this.toJavaScript(this.service, fileName);
        };
        TypeScriptSimple.prototype.createService = function () {
            var _this = this;
            var defaultLib = this.getDefaultLibFileName(this.options);
            var defaultLibPath = path.join(this.getTypeScriptBinDir(), defaultLib);
            this.files[defaultLib] = { version: 0, text: fs.readFileSync(defaultLibPath).toString() };
            var serviceHost = {
                getScriptFileNames: function () { return Object.keys(_this.files); },
                getScriptVersion: function (fileName) { return _this.files[fileName] && _this.files[fileName].version.toString(); },
                getScriptSnapshot: function (fileName) {
                    var file = _this.files[fileName];
                    if (!file) {
                        // default lib
                        var defaultLibPath_1 = path.join(_this.getTypeScriptBinDir(), fileName);
                        if (fs.existsSync(defaultLibPath_1)) {
                            file = _this.files[fileName] = { version: 0, text: fs.readFileSync(defaultLibPath_1).toString() };
                        }
                    }
                    if (file) {
                        return {
                            getText: function (start, end) { return file.text.substring(start, end); },
                            getLength: function () { return file.text.length; },
                            getLineStartPositions: function () { return []; },
                            getChangeRange: function (oldSnapshot) { return undefined; }
                        };
                    }
                    else {
                        // This is some reference import
                        return {
                            getText: function (start, end) { return ''; },
                            getLength: function () { return 0; },
                            getLineStartPositions: function () { return []; },
                            getChangeRange: function (oldSnapshot) { return undefined; }
                        };
                    }
                },
                getCurrentDirectory: function () { return process.cwd(); },
                getCompilationSettings: function () { return _this.options; },
                getDefaultLibFileName: function (options) {
                    return _this.getDefaultLibFileName(options);
                },
                // TODO: Use options.newLine
                getNewLine: function () { return os.EOL; },
                log: function (message) { return console.log(message); },
                trace: function (message) { return console.trace(message); },
                error: function (message) { return console.error(message); },
                readFile: readFile,
                fileExists: fileExists
            };
            function readFile(filename, encoding) {
                try {
                    var content = fs.readFileSync(filename, encoding || 'utf8');
                    return content;
                }
                catch (e) {
                    return '';
                }
            }
            function fileExists(filename) {
                return readFile(filename) !== '';
            }
            return ts.createLanguageService(serviceHost, ts.createDocumentRegistry());
        };
        TypeScriptSimple.prototype.getTypeScriptBinDir = function () {
            return path.dirname(require.resolve('typescript'));
        };
        TypeScriptSimple.prototype.getDefaultLibFileName = function (options) {
            switch (options.target) {
                case ts.ScriptTarget.ES2015:
                    return 'lib.es6.d.ts';
                case ts.ScriptTarget.ES2016:
                    return 'lib.es2016.d.ts';
                case ts.ScriptTarget.ES2017:
                case ts.ScriptTarget.ESNext:
                case ts.ScriptTarget.Latest:
                    return 'lib.es2017.d.ts';
                default:
                    return 'lib.d.ts';
            }
        };
        TypeScriptSimple.prototype.toJavaScript = function (service, fileName) {
            var output = service.getEmitOutput(fileName);
            var allDiagnostics = service.getCompilerOptionsDiagnostics()
                .concat(service.getSyntacticDiagnostics(fileName));
            if (this.doSemanticChecks) {
                allDiagnostics = allDiagnostics.concat(service.getSemanticDiagnostics(fileName));
            }
            if (allDiagnostics.length) {
                throw new Error(this.formatDiagnostics(allDiagnostics));
            }
            if (output.outputFiles.length === 0) {
                throw new Error('No output files');
            }
            var file = output.outputFiles[0];
            assert(/\.jsx?$/.test(file.name));
            return file.text;
        };
        TypeScriptSimple.prototype.formatDiagnostics = function (diagnostics) {
            return diagnostics.map(function (d) {
                if (d.file && typeof d.start === 'number') {
                    return 'L' + d.file.getLineAndCharacterOfPosition(d.start).line + ': ' + d.messageText;
                }
                else {
                    return d.messageText;
                }
            }).join(os.EOL);
        };
        return TypeScriptSimple;
    }());
    tss.TypeScriptSimple = TypeScriptSimple;
})(tss || (tss = {}));
var defaultTss = new tss.TypeScriptSimple();
module.exports = tss;
