(function ($, document) {

    $(document).on('pagebeforeshow', "#gamesRecommendedPage", function () {

        var parentId = LibraryMenu.getTopParentId();
        var userId = Dashboard.getCurrentUserId();

        var page = this;

        var options = {

            IncludeItemTypes: "Game",
            Limit: 18,
            Fields: "PrimaryImageAspectRatio",
            ParentId: parentId,
            ImageTypeLimit: 1,
            EnableImageTypes: "Primary,Backdrop,Banner,Thumb"
        };

        ApiClient.fetchJSON(ApiClient.getUrl('Users/' + userId + '/Items/Latest', options)).then(function (items) {

            $('#recentlyAddedItems', page).html(LibraryBrowser.getPosterViewHtml({
                items: items,
                transparent: true,
                borderless: true,
                shape: 'auto',
                lazy: true

            })).lazyChildren();

        });

        options = {

            SortBy: "DatePlayed",
            SortOrder: "Descending",
            MediaTypes: "Game",
            Limit: 18,
            Recursive: true,
            Filters: "IsPlayed",
            Fields: "ItemCounts,AudioInfo,PrimaryImageAspectRatio",
            ParentId: parentId,
            ImageTypeLimit: 1,
            EnableImageTypes: "Primary,Backdrop,Banner,Thumb"
        };

        ApiClient.getItems(userId, options).then(function (result) {

            if (result.Items.length) {
                $('#recentlyPlayedSection', page).show();
            } else {
                $('#recentlyPlayedSection', page).hide();
            }

            $('#recentlyPlayedItems', page).html(LibraryBrowser.getPosterViewHtml({
                items: result.Items,
                transparent: true,
                borderless: true,
                shape: 'auto',
                lazy: true

            })).lazyChildren();

        });

    });

})(jQuery, document);