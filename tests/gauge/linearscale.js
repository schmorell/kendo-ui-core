(function() {
    var dataviz = kendo.dataviz,
        Gauge = dataviz.ui.Gauge,
        Box2D = dataviz.Box2D,
        Point2D = dataviz.Point2D,
        LinearScale,
        linearScale,
        chartBox = new Box2D(0, 0, 400, 400),
        view,
        TOLERANCE = 1.5;

    LinearScale = dataviz.LinearScale.extend({
        options: {
            labels: {
                // Tests expect particular font size
                font: "16px Verdana, sans-serif"
            }
        }
    });

    function createScale(options) {
        linearScale = new LinearScale(options);
        view = new ViewStub();
    }

    // ------------------------------------------------------------
    module("Linear Scale/ Ranges");

    test("render range from 10 to 20", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 20
            }]
        });
        linearScale.reflow(chartBox);
        linearScale.getViewElements(view);
        var rect = view.log.rect[0];

        arrayClose([rect.x1 , rect.y1, rect.x2, rect.y2], [39, 238.1, 44, 313.4], TOLERANCE);
    });

    test("render range from 10 to 15 and from 15 to 20", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 15
            }, {
                from: 15,
                to: 20
            }]
        });
        linearScale.reflow(chartBox);
        linearScale.getViewElements(view);

        var rect = view.log.rect[0];
        arrayClose([rect.x1 , rect.y1, rect.x2, rect.y2], [39, 276, 44, 313.4], TOLERANCE);

        rect = view.log.rect[1];
        arrayClose([rect.x1 , rect.y1, rect.x2, rect.y2], [39, 238, 44, 276], TOLERANCE);
    });

    // ------------------------------------------------------------
    module("Linear Scale / Configuration");

    test("render scale with default min, max and step", function() {
        createScale({ });
        var options = linearScale.options;
        equal(options.min, 0);
        equal(options.max, 50);
        equal(options.majorUnit, 10);
    });

    test("render scale with min=0 max=12 step=2", function() {
        createScale({
            min: 0,
            max: 12
        });
        equal(linearScale.options.majorUnit, 2);
    });

    test("sets auto majorUnit", function() {
        createScale({
            min: 0,
            max: 1000
        });
        equal(linearScale.options.majorUnit, 200);
    });

    test("sets auto minorUnit", function() {
        createScale({
            min: 0,
            max: 1000
        });
        equal(linearScale.options.minorUnit, 20);
    });

    test("sets majorUnit", function() {
        createScale({
            min: 0,
            max: 1000,
            majorUnit: 10
        });
        equal(linearScale.options.majorUnit, 10);
    });

    test("sets auto minorUnit", function() {
        createScale({
            min: 0,
            max: 1000,
            minorUnit: 10
        });
        equal(linearScale.options.minorUnit, 10);
    });

    // ------------------------------------------------------------
    module("Linear Scale/ Ranges/ Configuration");

    test("render color", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 20,
                color: "red"
            }]
        });
        linearScale.reflow(chartBox);
        linearScale.getViewElements(view);
        var rect = view.log.rect[0];

        ok(rect.style.fill, "red");
    });

    test("render opacity", function() {
        createScale({
            ranges: [{
                from: 10,
                to: 20,
                opacity: 0.33
            }]
        });
        linearScale.reflow(chartBox);
        linearScale.getViewElements(view);
        var rect = view.log.rect[0];
        ok(rect.style.fillOpacity, 0.33);
    });
}());
