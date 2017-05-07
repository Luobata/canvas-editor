export const hack = function () {
    window.console.logger = function (obj) {
        window.console.log(JSON.parse(JSON.stringify(obj)));
    }
};
