const bluebird = require('bluebird');
const spawn = require('child_process').spawn;
const path = require('path');
var fs = require('fs');

function verpatch(exePath, version, options) {
    var exec = path.resolve(__dirname, '..', 'bin', 'verpatch.exe');
    var args = [];

    return new bluebird(function (resolve, reject) {
        if (!exePath) {
            reject(new Error('Error: Executable path not provided'));
            return false;
        }

        if (!version) {
            reject(new Error('Error: Version not provided'));
            return false;
        }

        if (!options) {
            reject(new Error('Error: Options not provided'));
            return false;
        }

        if (!fs.existsSync(exePath)) {
            reject('Error: Executable file not found');
            return false;
        }

        args = [exePath, '/va', version];

        for (var option in options) {
            if (option === 'pv') {
                args.push('/pv', options[option]);
            } else {
                args.push('/s', option, options[option]);
            }
        }

        if (process.platform !== "win32") {
            args.unshift(exec);
            exec = "wine";
        }

        var child = spawn(exec, args);

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);

        child.on('error', function(error) {
            reject(error);
        });

        child.on('close', function(code) {
            if (code !== 0) {
                reject(`Process exited with non zero exit code: ${code}`);
            }

            resolve(code);
        });
    });
}

module.exports = verpatch;