define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Description = void 0;
    class Description {
        constructor(name, id, url, type) {
            this.name = name;
            this.id = id;
            this.url = url;
            this.type = type;
        }
        complete(api) {
            return api.call(this.url);
        }
    }
    exports.Description = Description;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQUVBLE1BQWEsV0FBVztRQUNwQixZQUNTLElBQVksRUFDWixFQUFVLEVBQ1YsR0FBVyxFQUNYLElBQVk7WUFIWixTQUFJLEdBQUosSUFBSSxDQUFRO1lBQ1osT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBR3JCLENBQUM7UUFFTSxRQUFRLENBQUksR0FBUTtZQUN2QixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FFSjtJQWRELGtDQWNDIn0=