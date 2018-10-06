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
        "www.google.co.uk/search?biw=1280&bih=613&tbm=isch&sa=1&ei=UO20W87XJ6WCgAbsqoWACQ&q=Burundi&oq=Burundi&gs_l=img.3..0l10.18266.18266.0.18619.1.1.0.0.0.0.142.142.0j1.1.0....0...1c.2.64.img..0.1.142....0.xfnu3CQzYEA",

        // C
        "www.google.co.uk/search?q=cabo+verde&source=lnms&tbm=isch&sa=X&ved=0ahUKEwicrMm_4fHdAhWpBsAKHb5wDREQ_AUIDygC&biw=1280&bih=662",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=MKO4W7nuGauQgAad0aaIDA&q=Cambodia&oq=Cambodia&gs_l=img.3..0i67k1j0j0i67k1l2j0l6.18767.18767.0.19227.1.1.0.0.0.0.93.93.1.1.0....0...1c.2.64.img..0.1.92....0.3G47RRs7lHY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=RKO4W8qUIIH0gAbX5KPoDQ&q=Cameroon&oq=Cameroon&gs_l=img.3..0l10.21938.21938.0.22419.1.1.0.0.0.0.82.82.1.1.0....0...1c.2.64.img..0.1.82....0.IizFxIJF7j8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=W6O4W-f8NazAgAb0u4LwAg&q=Canada&oq=Canada&gs_l=img.3..0i67k1j0j0i67k1j0j0i67k1j0l5.22238.22238.0.23174.1.1.0.0.0.0.84.84.1.1.0....0...1c.2.64.img..0.1.82....0.tasUmXIB8vY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=dKO4W6rLBsKZgAbe76LQCQ&q=Central+African+Republic&oq=Central+African+Republic&gs_l=img.3..0l10.22915.22915.0.23461.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.74....0.bpWY2jXYdqk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=jKO4W_raLqqYgAaNtrSIDA&q=Central+American+Federation&oq=Central+American+Federation&gs_l=img.3..0.36809.36809.0.37440.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.74....0.GULxPDlr4EU",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=s6O4W768FqqHgAb2gaqQBA&q=Chad&oq=Chad&gs_l=img.3..0i67k1l2j0l3j0i67k1l2j0l2j0i67k1.21698.21698.0.22070.1.1.0.0.0.0.74.74.1.1.0....0...1c.2.64.img..0.1.73....0.Yh4DM9Qep5M",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=yqO4W4KcIYyQgAbEnbWYBQ&q=Chile&oq=Chile&gs_l=img.3..0j0i67k1j0l8.28840.28840.0.29125.1.1.0.0.0.0.83.83.1.1.0....0...1c.2.64.img..0.1.82....0.hWetUjjE7PM",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=6KO4W_PuH-zZgAaS9rToBA&q=China&oq=China&gs_l=img.3..0i67k1j0l4j0i67k1j0j0i67k1j0l2.28428.28428.0.28729.1.1.0.0.0.0.87.87.1.1.0....0...1c.2.64.img..0.1.85....0.TrfjFJswE9c",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=BqS4W9mtEMncgAapr5y4Cw&q=Colombia&oq=Colombia&gs_l=img.3..0l10.21608.21608.0.22011.1.1.0.0.0.0.74.74.1.1.0....0...1c.2.64.img..0.1.73....0.JgCGkgqDlls",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=HaS4W8vyEJOcgQbqwJvYDg&q=Comoros&oq=Comoros&gs_l=img.3..0l2j0i67k1l2j0l6.15940.15940.0.16340.1.1.0.0.0.0.87.87.1.1.0....0...1c.2.64.img..0.1.86....0.EAihZkG8zjs",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=LqS4W_zeKovBgAbCvbewAw&q=Costa+Rica&oq=Costa+Rica&gs_l=img.3..0l10.15700.15700.0.15897.1.1.0.0.0.0.80.80.1.1.0....0...1c.2.64.img..0.1.79....0.H7SXmVn23HQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=P6S4W_O7J6WegAbAobPICw&q=Cote+D%E2%80%99Ivoire&oq=Cote+D%E2%80%99Ivoire&gs_l=img.3..0l2j0i10k1l8.15141.15141.0.15363.1.1.0.0.0.0.93.93.1.1.0....0...1c.2.64.img..0.1.92....0.i0KDigELkcE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=UKS4W7aEAszygQaXurbQCA&q=Croatia&oq=Croatia&gs_l=img.3..0j0i67k1l2j0l7.14456.14456.0.14693.1.1.0.0.0.0.74.74.1.1.0....0...1c.2.64.img..0.1.74....0.LOZZainJXYs",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=X6S4W_aLJ8PSgAaF8KDgAw&q=Cuba&oq=Cuba&gs_l=img.3..0i67k1l2j0l2j0i67k1j0l5.15775.15775.0.16118.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.73....0.Y3QS7FSzclY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=cKS4W_DPLaragAawoqn4Cw&q=Cyprus&oq=Cyprus&gs_l=img.3..0i67k1l2j0j0i67k1l2j0l5.17187.17187.0.17459.1.1.0.0.0.0.98.98.1.1.0....0...1c.2.64.img..0.1.97....0.DD5mX8jQeF8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=g6S4W7HdBOydgAaJuJ-gBg&q=Czechia&oq=Czechia&gs_l=img.3..0l10.19227.19227.0.20339.1.1.0.0.0.0.87.87.1.1.0....0...1c.2.64.img..0.1.86....0.GEPJSs_hiwQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=mKS4W4rpFayYgAbX4orgDA&q=Czechoslovakia&oq=Czechoslovakia&gs_l=img.3..0l10.34021.34021.0.34407.1.1.0.0.0.0.78.78.1.1.0....0...1c.2.64.img..0.1.77....0.C7PJCLKpEeQ",

        // D
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=u6S4W5WIMsS0gAbHhITACA&q=Democratic+Republic+of+the+Congo&oq=Democratic+Republic+of+the+Congo&gs_l=img.3..0l10.245543.245543.0.245863.1.1.0.0.0.0.183.183.0j1.1.0....0...1c.2.64.img..0.1.182....0.5ysXZSucCkQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=sqW4W9i4KIbXgQbKu6XADw&q=Denmark&oq=Denmark&gs_l=img.3..0j0i67k1l2j0j0i67k1l2j0l4.66883.66883.0.67257.1.1.0.0.0.0.91.91.1.1.0....0...1c.2.64.img..0.1.90....0.6JCLQnNA8m4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=9qW4W7bsOcHlgQbb0bGIBA&q=Djibouti&oq=Djibouti&gs_l=img.3..0j0i67k1j0l8.22560.22560.0.22910.1.1.0.0.0.0.72.72.1.1.0....0...1c.2.64.img..0.1.71....0.Oe9YrbFsXe4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Dqa4W5_BLezTgAaqnpB4&q=Dominica&oq=Dominica&gs_l=img.3..0i67k1j0j0i67k1j0l2j0i67k1l2j0l3.18490.18490.0.19259.1.1.0.0.0.0.85.85.1.1.0....0...1c.2.64.img..0.1.83....0.-Y8qxg47Yi8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Iqa4W9epO9TlgQbcj4H4Cg&q=Dominican+Republic&oq=Dominican+Republic&gs_l=img.3..0l10.14212.14212.0.14675.1.1.0.0.0.0.101.101.0j1.1.0....0...1c.2.64.img..0.1.99....0.G10Wdy4UHfo",

        // E
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Mqa4W7ezIqzHgAbU44rABQ&q=East+Germany&oq=East+Germany&gs_l=img.3..0l10.20031.20031.0.20590.1.1.0.0.0.0.79.79.1.1.0....0...1c.2.64.img..0.1.79....0.SNPr7OUP4EY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=SKa4W_WkCYiBgAa2vaCYDQ&q=Ecuador&oq=Ecuador&gs_l=img.3..0l2j0i67k1j0l7.27537.27537.0.28232.1.1.0.0.0.0.83.83.1.1.0....0...1c.2.64.img..0.1.82....0.fMojUuMhrgg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Zaa4W_GNGaX0gAbyxaeoBA&q=Egypt&oq=Egypt&gs_l=img.3..0i67k1l3j0l7.15952.15952.0.16289.1.1.0.0.0.0.102.102.0j1.1.0....0...1c.2.64.img..0.1.101....0.WQv9APvPjvY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=dqa4W-uTJIq3gQaf8aHIBQ&q=El+Salvador&oq=El+Salvador&gs_l=img.3..0l10.12433.12433.0.12826.1.1.0.0.0.0.96.96.1.1.0....0...1c.2.64.img..0.1.95....0.oDyGrfSorOc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=hKa4W5iFDsmIgAathYGIBQ&q=Equatorial+Guinea&oq=Equatorial+Guinea&gs_l=img.3..0l10.13993.13993.0.14552.1.1.0.0.0.0.82.82.1.1.0....0...1c.2.64.img..0.1.82....0.jQseDXyUItI",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=k6a4W-nVK4bWgQbxlJ6IDw&q=Eritrea&oq=Eritrea&gs_l=img.3..0i67k1l3j0j0i67k1j0l5.13034.13034.0.13651.1.1.0.0.0.0.80.80.1.1.0....0...1c.2.64.img..0.1.80....0.LE93VaLDbLs",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=oqa4W5S7JsvZgAb1g6TIBQ&q=Estonia&oq=Estonia&gs_l=img.3..0j0i67k1j0l8.19447.19447.0.19768.1.1.0.0.0.0.79.79.1.1.0....0...1c.2.64.img..0.1.78....0.F5yjLHNZpP0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=t6a4W5fOGIyVgAan77qwCw&q=Eswatini&oq=Eswatini&gs_l=img.3..0l10.14766.14766.0.16240.1.1.0.0.0.0.106.106.0j1.1.0....0...1c.2.64.img..0.1.105....0.q4pKm-Nc-dE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=yKa4W4DQINHogAaPl7OABg&q=Ethiopia&oq=Ethiopia&gs_l=img.3..0l10.23226.23226.0.23499.1.1.0.0.0.0.85.85.1.1.0....0...1c.2.64.img..0.1.84....0.fY6KWLbwGLU",

        // F
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Dae4W-fRG6magAbC2Z3YAw&q=Fiji&oq=Fiji&gs_l=img.3..0i67k1j0l9.14235.14235.0.15106.1.1.0.0.0.0.79.79.1.1.0....0...1c.2.64.img..0.1.78....0.5bgkaFWnfso",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Hae4W6idFKSOgAbSz4rQBw&q=Finland&oq=Finland&gs_l=img.3..0i67k1j0l9.87776.87776.0.88209.1.1.0.0.0.0.106.106.0j1.1.0....0...1c.2.64.img..0.1.106....0.lTrOnKVVtno",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=dqe4W8LSHurOgAb72oLgBA&q=France&oq=France&gs_l=img.3..0i67k1l2j0l3j0i67k1j0l4.16231.16231.0.16507.1.1.0.0.0.0.79.79.1.1.0....0...1c.2.64.img..0.1.78....0.OSNHW24Iktc",

        // G
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Bqe4W-r7LYbWgQbxlJ6IDw&q=Germany&oq=Germany&gs_l=img.3..0i67k1l9j0.5460.5460.0.5649.1.1.0.0.0.0.90.90.1.1.0....0...1c.1.64.img..0.1.90....0.T4X82xpMMUE"



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
