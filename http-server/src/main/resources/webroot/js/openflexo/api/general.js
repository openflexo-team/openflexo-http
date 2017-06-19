define(["require", "exports"], function (require, exports) {
    "use strict";
    var Description = (function () {
        function Description(id, url, type) {
            this.id = id;
            this.url = url;
            this.type = type;
        }
        Description.prototype.complete = function (api) {
            return api.call(this.url);
        };
        return Description;
    }());
    exports.Description = Description;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQUNJLHFCQUNXLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWTtZQUZaLE9BQUUsR0FBRixFQUFFLENBQVE7WUFDVixRQUFHLEdBQUgsR0FBRyxDQUFRO1lBQ1gsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUd2QixDQUFDO1FBRU0sOEJBQVEsR0FBZixVQUFtQixHQUFRO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUwsa0JBQUM7SUFBRCxDQUFDLEFBYkQsSUFhQztJQWJZLGtDQUFXIn0=