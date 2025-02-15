import {defaults} from '../packs/default.js';

export var importTable = [defaults];
export var emotesClass = {
    content: {},
    updateEmotes: function(emoteObject, idx) {
        this.content = emoteObject;
    }
};

// enumerate through imported table and update emotesClass
importTable.forEach((obj, index) => {
    emotesClass.updateEmotes({metadata: obj.metadata, content: obj.content || {}}, index);
});