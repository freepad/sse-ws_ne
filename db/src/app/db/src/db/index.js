"use strict";
module.exports = {
    logins: [],
    posts: [],
    handlers: [],
    /**
     *
     * @param item For a For a SiteEvent
     */
    adds(item) {
        this.logins.push(item);
        this.handlers.forEach((handler) => handler(item));
    },
    /**
     *
     * @param handler For a SiteEvent
     */
    listener(handler) {
        this.handlers.push(handler);
    }
};
// module.exports = firstDb;
//# sourceMappingURL=index.js.map