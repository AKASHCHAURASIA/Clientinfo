$(function () {
    var ds = window.localStorage;

    if (ds && ds.getItem('dont-show-me-ad2') === null) {
        $('#theme-quarry-ad').hide(5).delay(500).slideDown(500);
        $('#theme-quarry-ad').addClass('is-visible');
    }

    $('.close-theme-quarry-ad').click(function (e) {
        e.preventDefault();
        $('#theme-quarry-ad').slideUp();
        ds.setItem('dont-show-me-ad2', true);
    });

    $('.premium-theme-ad').each(function (i, div) {
        $.get('/adsync/1', function (response) {
            $(div).html(response);
        });
    });

    $(document).on('click', '.ad-click-event', function (e) {
        e.preventDefault();
        var category = 'Premium Template';
        var action   = '';
        if ($(e.target).is('img')) {
            action = 'Image Buy Now';
        } else {
            action = $(this).text().toLowerCase().indexOf('buy') > -1 ? 'Buy Now' : 'Preview';
        }

        var label = $(this).attr('href');
        var went  = false;

        function go() {
            if (!went) {
                went                 = true;
                window.location.href = label;
            }
        }

        setTimeout(go, 500);

        ga('send', 'event', {
            eventCategory: category,
            eventAction  : action,
            eventLabel   : label,
            transport    : 'beacon',
            hitCallback  : go,
            dimension1   : window.location.pathname + window.location.search + window.location.hash,
            dimension2   : window.location.host
        });
    });
});