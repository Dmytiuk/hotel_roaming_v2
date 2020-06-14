$(document).ready(function() {

            $('#slider').slider({
                value: 50,
                create: setInputsFromSlider,
                slide: setInputsFromSlider,
                stop: setInputsFromSlider
            })

            function setInputsFromSlider() {
                $('#slideVal').val($('#slider').slider("value"));
            }

            $('#rangeslider').slider({
                values: [35, 65],
                range: true,
                create: setInputsFrom2Slider,
                slide: setInputsFrom2Slider,
                stop: setInputsFrom2Slider
            })

            function setInputsFrom2Slider() {
                $('#rangeMin').val($('#rangeslider').slider("values", 0));
                $('#rangeMax').val($('#rangeslider').slider("values", 1));
            }

            $('input').change(function(e) {
                switch (this.id) {
                    case "rangeMin":
                    case "rangeMax":
                        var index = (this.id == "rangeMax") ? 1 : 0;
                        $('#rangeslider').slider("values", index, $(this).val())
                        break;
                    case "slideVal":
                        $('#slider').slider("value", $(this).val())
                        break;
                }
            })
});
