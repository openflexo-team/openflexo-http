define(["require", "exports"], function (require, exports) {
    "use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdlbmVyYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7SUFFQTtRQUNJLFlBQ1MsSUFBWSxFQUNaLEVBQVUsRUFDVixHQUFXLEVBQ1gsSUFBWTtZQUhaLFNBQUksR0FBSixJQUFJLENBQVE7WUFDWixPQUFFLEdBQUYsRUFBRSxDQUFRO1lBQ1YsUUFBRyxHQUFILEdBQUcsQ0FBUTtZQUNYLFNBQUksR0FBSixJQUFJLENBQVE7UUFHckIsQ0FBQztRQUVNLFFBQVEsQ0FBSSxHQUFRO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBRUo7SUFkRCxrQ0FjQyJ9