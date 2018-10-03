// Render Multiple URLs to file

"use strict";
var RenderUrlsToFile, arrayOfUrls, system;

system = require("system");

/*
Render given urls
@param array of URLs to render
@param callbackPerUrl Function called after finishing each URL, including the last URL
@param callbackFinal Function called after finishing everything
*/
RenderUrlsToFile = function(urls, callbackPerUrl, callbackFinal) {
    var getFilename, next, page, retrieve, urlIndex, webpage;
    urlIndex = 0;
    webpage = require("webpage");
    page = null;
    getFilename = function() {
        return "rendermulti-" + urlIndex + ".png";
    };
    next = function(status, url, file) {
        page.close();
        callbackPerUrl(status, url, file);
        return retrieve();
    };
    retrieve = function() {
        var url;
        if (urls.length > 0) {
            url = urls.shift();
            urlIndex++;
            page = webpage.create();
            page.viewportSize = {
                width: 1440,
                height: 1024
            };
            page.settings.userAgent = "Phantom.js bot";
            return page.open("http://" + url, function(status) {
                var file;
                file = getFilename();
                if (status === "success") {
                    return window.setTimeout((function() {
                        page.render(file);
                        return next(status, url, file);
                    }), 200);
                } else {
                    return next(status, url, file);
                }
            });
        } else {
            return callbackFinal();
        }
    };
    return retrieve();
};

arrayOfUrls = null;

if (system.args.length > 1) {
    arrayOfUrls = Array.prototype.slice.call(system.args, 1);
} else {
    console.log("Usage: phantomjs render_multi_url.js [domain.name1, domain.name2, ...]");
    arrayOfUrls = [
        // A
        "www.google.co.uk/search?q=afghanistan&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiQ7uv00OrdAhUsDMAKHY0XAQUQ_AUIECgD&biw=1280&bih=613",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Rua0W-CsNMvPgAbU7r7wDA&q=Albania&oq=Albania&gs_l=img.3..35i39k1j0i67k1l2j0l3j0i67k1l2j0j0i67k1.26073.26073.0.26347.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.DnQxvKJL5VQ",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Yea0W5e2OYydgAaA7pmgAw&q=Algeria&oq=Algeria&gs_l=img.3..35i39k1j0i67k1j0l7j0i67k1.31581.31581.0.32006.1.1.0.0.0.0.71.71.1.1.0....0...1c.2.64.img..0.1.70....0.SMCc99ThMuw",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=gua0W8C3M8zVgQa44ZL4BQ&q=Andorra&oq=Andorra&gs_l=img.3..0j0i67k1j0l8.25293.25293.0.25813.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.66....0.1wWSf3hgm7E",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=nea0W7HGH8vRgAaz86XQCg&q=Angola&oq=Angola&gs_l=img.3..0i67k1l2j0l3j0i67k1l2j0j0i67k1j0.23492.23492.0.24470.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.EwFAdJ0qTGA",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=t-a0W5uhBMbMgAb4_rXoDA&q=Antigua+and+Barbuda&oq=Antigua+and+Barbuda&gs_l=img.3..0l10.877059.877059.0.877459.1.1.0.0.0.0.73.73.1.1.0....0...1c.2.64.img..0.1.73....0.GuFtWUYCrC8",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Jeq0W7ivE-XwgAbIwYfADA&q=Argentina&oq=Argentina&gs_l=img.3..0i67k1l2j0j0i67k1j0l6.37901.37901.0.38390.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.B4ojMPTdESQ",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=TOq0W4ucI46C8gKnyozQCQ&q=Armenia&oq=Armenia&gs_l=img.3..0i67k1j0l2j0i67k1j0j0i67k1j0l3j0i67k1.19706.19706.0.20817.1.1.0.0.0.0.86.86.1.1.0....0...1c.2.64.img..0.1.86....0.loEEnugUx-8",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Yuq0W-KHEeWEgAbSsoXQDQ&q=Australia&oq=Australia&gs_l=img.3..0i67k1j0j0i67k1j0l3j0i67k1j0l3.18996.18996.0.19581.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.hZ51UPnpbUU",
        "www.google.co.uk/search?q=austria&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjm_P-b1erdAhVCTMAKHYe3CW4Q_AUIDygC&biw=1280&bih=613",
        "www.google.co.uk/search?q=Austrian+Empire&source=lnms&tbm=isch&sa=X&ved=0ahUKEwi6oL2I1erdAhXILMAKHX1HAZIQ_AUIDigB&biw=1280&bih=613",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=tuq0W5O3H5DzgAbQ6ZWwBw&q=Azerbaijan&oq=Azerbaijan&gs_l=img.3..0j0i67k1l2j0l2j0i67k1j0l4.69748.69748.0.70149.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.65....0.r-jtZcUoILw",

        // B
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=_eq0W_uAKYTagAa59rmgDA&q=Baden*&oq=Baden*&gs_l=img.3..0i30k1l10.206858.206858.0.207098.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.qaddOOnnqw8",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=zeu0W_uOLITygQbX8r74Bg&q=Bahrain&oq=Bahrain&gs_l=img.3..0l10.38590.38590.0.39046.1.1.0.0.0.0.60.60.1.1.0....0...1c.2.64.img..0.1.59....0.kyadfl6xRaQ",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=9eu0W-6zIonIgAa_47n4Bg&q=Bangladesh&oq=Bangladesh&gs_l=img.3..0i67k1l4j0j0i67k1l3j0l2.24240.24240.0.24640.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.61....0.lyopOTJYoJQ",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=D-y0W6WrCdT8gAajtpyIBg&q=Barbados&oq=Barbados&gs_l=img.3..0j0i67k1l2j0j0i67k1j0l5.15386.15386.0.15834.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.vm4FrzE-0Kc",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Mey0W4KBN6rQgAbmpa3gDw&q=Bavaria&oq=Bavaria&gs_l=img.3..0i67k1j0l9.2457.2457.0.3015.1.1.0.0.0.0.74.74.1.1.0....0...1c.1.64.img..0.1.73....0.GVuJ8w8uuy0",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Ney0W4flLtGfgQbLqKOwDw&q=Belarus&oq=Belarus&gs_l=img.3..0l10.52196.52196.0.52621.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.62....0.NDtCdCJxaOk",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=a-y0W8XqEpSfgQaUuZPACQ&q=Belgium&oq=Belgium&gs_l=img.3..0i67k1l2j0j0i67k1l2j0j0i67k1j0l3.15918.15918.0.16544.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.61....0.ir21wSAveFo",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=fOy0W4HmLavVgAbHqrW4CA&q=Belize&oq=Belize&gs_l=img.3..0i67k1l2j0j0i67k1l2j0l5.21152.21152.0.21505.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.62....0.7c3r9p_l8Ww",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=quy0W-ejD9GfgQbLqKOwDw&q=Benin&oq=Benin&gs_l=img.3..35i39k1j0i67k1j0l6j0i67k1l2.4754.5681.0.6202.10.9.0.0.0.0.135.778.6j3.9.0....0...1c.1.64.img..3.7.544...0i30k1.0.-p0hVW2FXbQ",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=sey0W-C5FIWegAa907uACw&q=Bolivia&oq=Bolivia&gs_l=img.3..0i67k1l2j0l8.17524.17524.0.17829.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.61....0.sllAiyYdMRo",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=xOy0W4Vv6YSABvzfpagH&q=Bosnia+and+Herzegovina&oq=Bosnia+and+Herzegovina&gs_l=img.3..0j0i67k1j0l8.13014.13014.0.13256.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.wGYBmrfUJjg",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=0uy0W9rYDavTgAbO0KfICQ&q=Botswana&oq=Botswana&gs_l=img.3..0i67k1l3j0j0i67k1j0l5.14864.14864.0.15458.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.bM7La4usYWI",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=4uy0W4rfH-SugAbt57iwAw&q=Brazil&oq=Brazil&gs_l=img.3..0i67k1l2j0l8.16238.16238.0.16753.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.65....0.wp4xuNahdpA",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=9Oy0W-e4CYPvgAa5nK3oDA&q=Brunei&oq=Brunei&gs_l=img.3..0l10.14798.14798.0.15048.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.k5_lPxcjmAE",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=BO20W4HSAunEgAbOiI74Cg&q=Brunswick+and+L%C3%BCneburg&oq=Brunswick+and+L%C3%BCneburg&gs_l=img.3...19098.19098.0.19348.1.1.0.0.0.0.57.57.1.1.0....0...1c.2.64.img..0.0.0....0.l-IjgPI3ojQ",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=GO20W4uuHqzAgAbei6rADA&q=Bulgaria&oq=Bulgaria&gs_l=img.3..0l10.14649.14649.0.14915.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.62....0.WkcgoX7lrzc",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=Nu20W9CdOozEgAbh3aRY&q=Burkina+Faso&oq=Burkina+Faso&gs_l=img.3..0i67k1j0l2j0i67k1j0l6.3297.3297.0.3505.1.1.0.0.0.0.73.73.1.1.0....0...1c.1.64.img..0.1.72....0.AwEgCPNHpc0",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=O-20W7CKH-jVgAaN9o_oCw&q=Burma&oq=Burma&gs_l=img.3..0j0i67k1j0l8.19897.19897.0.20225.1.1.0.0.0.0.60.60.1.1.0....0...1c.2.64.img..0.1.60....0.THX3YNEy4Ss",
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=UO20W87XJ6WCgAbsqoWACQ&q=Burundi&oq=Burundi&gs_l=img.3..0l10.18266.18266.0.18619.1.1.0.0.0.0.142.142.0j1.1.0....0...1c.2.64.img..0.1.142....0.xfnu3CQzYEA"

    ];
}

RenderUrlsToFile(arrayOfUrls, (function(status, url, file) {
    if (status !== "success") {
        return console.log("Unable to render '" + url + "'");
    } else {
        return console.log("Rendered '" + url + "' at '" + file + "'");
    }
}), function() {
    return phantom.exit();
});
