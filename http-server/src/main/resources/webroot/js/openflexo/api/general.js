define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBRUE7UUFDSSxZQUNXLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWTtZQUZaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUd2QixDQUFDO1FBRU0sUUFBUSxDQUFJLEdBQVE7WUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7S0FFSjtJQWJELGtDQWFDIn0=