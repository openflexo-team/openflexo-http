define(["require", "exports"], function (require, exports) {
    "use strict";
    class Description {
        constructor(id, url, type) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQUNJLFlBQ1csRUFBVSxFQUNWLEdBQVcsRUFDWCxJQUFZO1lBRlosT0FBRSxHQUFGLEVBQUUsQ0FBUTtZQUNWLFFBQUcsR0FBSCxHQUFHLENBQVE7WUFDWCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBR3ZCLENBQUM7UUFFTSxRQUFRLENBQUksR0FBUTtZQUN2QixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUVKO0lBYkQsa0NBYUMifQ==