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
                        page.render(file, {quality: '100'});
                        return next(status, url, file);
                    }), 1000);
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
        "www.google.co.uk/search?q=Gabon&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjKkvH6zfvdAhUMsqQKHVhKA5sQ_AUIECgD&biw=1280&bih=662",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=4sy9W_DqDou2kwXXjYjgDA&q=Georgia&oq=Georgia&gs_l=img.3..0i67k1j0j0i67k1j0l4j0i67k1j0l2.21847.21847.0.22216.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.bfbQ5RwMF0A",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=-cy9W6e6FozhkgXdwILwDQ&q=Germany&oq=Germany&gs_l=img.3..35i39k1j0l2j0i67k1j0l6.42649.42649.0.42970.1.1.0.0.0.0.82.82.1.1.0....0...1c.2.64.img..0.1.81....0.6T7Aqy061fY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Jc29W9W2EsSykwWqg5LoBw&q=Ghana&oq=Ghana&gs_l=img.3..0i67k1j0j0i67k1j0l7.14420.14420.0.15062.1.1.0.0.0.0.70.70.1.1.0....0...1c.2.64.img..0.1.69....0.7dB8irN-w3M",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Nc29W-auCcTTkwWO8KFQ&q=Greece&oq=Greece&gs_l=img.3..0i67k1l2j0j0i67k1l2j0l5.13355.13355.0.13725.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.p-4ZrAj5iuk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Q829W8P4LMOdkgW6mb2YCw&q=Grenada&oq=Grenada&gs_l=img.3..0j0i67k1l2j0l7.24800.24800.0.25376.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.62....0.ZIjBZZ9TsCw",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Xs29W4DYAoeVkwWJ8rzYBQ&q=Guatemala&oq=Guatemala&gs_l=img.3..0i67k1j0l9.15368.15368.0.15624.1.1.0.0.0.0.71.71.1.1.0....0...1c.2.64.img..0.1.71....0.dP70GozIsNQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=bs29W9GxHsa8kwWqy5-IBA&q=Guinea&oq=Guinea&gs_l=img.3..0j0i67k1l3j0j0i67k1l2j0l3.19589.19589.0.19950.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.0n3i6Fcecq8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=g829W_j-EYy0kwXznbG4DQ&q=Guinea-Bissau&oq=Guinea-Bissau&gs_l=img.3..0l10.75668.75668.0.75965.1.1.0.0.0.0.107.107.0j1.1.0....0...1c.2.64.img..0.1.106....0.dO-ShjbEoG4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=0M29W5TKB9D3kwWO9oLIAQ&q=Guyana&oq=Guyana&gs_l=img.3..0i67k1l3j0j0i67k1j0l5.18775.18775.0.19200.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.60....0.A9OpWZqr-go",

        // H
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=5M29W4O4DsL0kwWbzYv4BQ&q=Haiti&oq=Haiti&gs_l=img.3..0i67k1l2j0l6j0i67k1j0.37250.37250.0.37571.1.1.0.0.0.0.97.97.1.1.0....0...1c.2.64.img..0.1.97....0.wfXvK9OBRoU",
        "www.google.co.uk/search?q=Hawaii&source=lnms&tbm=isch&sa=X&ved=0ahUKEwjenbimz_vdAhVS3KQKHW-qD38Q_AUIDygC&biw=1280&bih=662",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=WM69W73RH4vgkgWyroaQCg&q=Holy+See&oq=Holy+See&gs_l=img.3..0l10.12238.12238.0.12446.1.1.0.0.0.0.78.78.1.1.0....0...1c.2.64.img..0.1.77....0.bngFLFNgqrE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Zc69W8uPNMqzsAeukLOYAw&q=Honduras&oq=Honduras&gs_l=img.3..0l10.22290.22290.0.22604.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.tMG4wHOrjQk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=fc69W8OEKoXpsAfFjYzgDw&q=Hungary&oq=Hungary&gs_l=img.3..0l3j0i67k1j0l6.14942.14942.0.15287.1.1.0.0.0.0.70.70.1.1.0....0...1c.2.64.img..0.1.70....0.OFCfmnW4qSY",

        // I
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=js69W9zsAYuckwXi5qjQAQ&q=Iceland&oq=Iceland&gs_l=img.3..0i67k1l2j0l4j0i67k1j0l3.15017.15017.0.15459.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.of4TIXMnjZc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ns69W5a_Fc2xkwXxjqmgCA&q=India&oq=India&gs_l=img.3..0i67k1j0j0i67k1l2j0j0i67k1j0l4.23745.23745.0.24210.1.1.0.0.0.0.71.71.1.1.0....0...1c.2.64.img..0.1.71....0.bl75GZV0rTM",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=t869W9GEH-LjkgWEo5iACQ&q=Indonesia&oq=Indonesia&gs_l=img.3..0i67k1j0j0i67k1j0l2j0i67k1j0l2j0i67k1l2.14202.14202.0.14613.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.73....0.cmgc8WDMPj4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=xs69W8XTPMi3kwXB-pb4Cw&q=Iran&oq=Iran&gs_l=img.3..0i67k1l2j0l3j0i67k1j0l4.12757.12757.0.13168.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.66....0.vFjTbYewywg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=1c69W8v-A465kwWku63ICg&q=Iraq&oq=Iraq&gs_l=img.3..0i67k1l2j0l3j0i67k1j0l4.278757.278757.0.278933.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.75....0.wJ12CuJVG04",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=7M-9W8TGNs2ZsAfY1LjoAg&q=Ireland&oq=Ireland&gs_l=img.3..0i67k1l2j0l8.16065.16065.0.16402.1.1.0.0.0.0.73.73.1.1.0....0...1c.2.64.img..0.1.72....0.HZd0VUSQy5s",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=_s-9W-bXCMGMkgWlqLuYCw&q=Israel&oq=Israel&gs_l=img.3..0i67k1l2j0l2j0i67k1j0l3j0i67k1j0.14665.14665.0.14961.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.75....0.Tqyjdsb5dPk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=DdC9W7nBNYu3kwW3n5KYBg&q=Italy&oq=Italy&gs_l=img.3..0i67k1j0l2j0i67k1j0l6.14143.14143.0.14350.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.67....0.qelwFVYhU48",

        // J
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=HdC9W9MGq-mwB83EkvAE&q=Jamaica&oq=Jamaica&gs_l=img.3..0i67k1j0l2j0i67k1j0l4j0i67k1j0.43518.43518.0.43870.1.1.0.0.0.0.108.108.0j1.1.0....0...1c.2.64.img..0.1.107....0.6sp62wcPxD4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=SdC9W_XALdLUsAfr9KWYAQ&q=Japan&oq=Japan&gs_l=img.3..0i67k1l3j0j0i67k1j0l5.14142.14142.0.14462.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.H5zQDxBxMmQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=bdC9W_zGDYrWkwWStrOgCA&q=Jordan+country&oq=Jordan+country&gs_l=img.3..0l4j0i67k1j0l5.3158.4260.0.4514.8.5.0.3.3.0.68.305.5.5.0....0...1c.1.64.img..0.8.313....0.ZkqaQzodYDE",

        // K
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ctC9W8LWItKdkgXq6ovICA&q=Kazakhstan&oq=Kazakhstan&gs_l=img.3..0i67k1l2j0j0i67k1l2j0j0i67k1l4.25944.25944.0.26376.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.61....0.fg5M5lnC9sI",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=jdC9W7CIKcvmsAeO6L_oAw&q=Kenya&oq=Kenya&gs_l=img.3..0i67k1l2j0l3j0i67k1j0l4.47945.47945.0.48368.1.1.0.0.0.0.106.106.0j1.1.0....0...1c.2.64.img..0.1.105....0.65iih9EvZaM",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=vtC9W-_VMsOzkwXW5aPYBw&q=Kingdom+of+Serbia%2FYugoslavia&oq=Kingdom+of+Serbia%2FYugoslavia&gs_l=img.3...16259.16259.0.16500.1.1.0.0.0.0.58.58.1.1.0....0...1c.2.64.img..0.0.0....0.T14s3lp37BQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=0NC9W6iPBtG3kwXv1Ygw&q=Kiribati&oq=Kiribati&gs_l=img.3..0l10.14404.14404.0.14854.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.vH4EVHBGGKU",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=39C9W5LSO8uWkwWB36rwAQ&q=Korea&oq=Korea&gs_l=img.3..0l10.12973.12973.0.13407.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.1yk8K631p14",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=7tC9W4XKEMKDsAeQyY_ACg&q=North+Korea&oq=North+Korea&gs_l=img.3..0i67k1l5j0l2j0i67k1j0l2.8854.9972.0.10411.6.6.0.0.0.0.86.409.6.6.0....0...1c.1.64.img..0.6.407...0i7i30k1j0i10k1.0.45KLuKO7gsw",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=-dC9W_-DGZG-kwWr34KADA&q=Kosovo&oq=Kosovo&gs_l=img.3..0l4j0i67k1j0l5.69312.69312.0.69513.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.N5yQr2D-gLQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=P9G9W5mQL4uYsAf33KuIDQ&q=Kuwait&oq=Kuwait&gs_l=img.3..0i67k1j0l9.14342.14342.0.14712.1.1.0.0.0.0.303.303.3-1.1.0....0...1c.2.64.img..0.1.302....0.foKXS40NBOo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=T9G9W-TdGIjjsAeL-KqgCg&q=Kyrgyzstan&oq=Kyrgyzstan&gs_l=img.3..0l2j0i67k1l2j0l6.12390.12390.0.12655.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.ui85My4pqe4",

        // L
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=XdG9W6bHAcbgkgW1wbuwBA&q=Laos&oq=Laos&gs_l=img.3..0j0i67k1l2j0l7.20656.20656.0.21031.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.8TX1rsJB5N4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ctG9W57aMYyRsAfczoDIDQ&q=Latvia&oq=Latvia&gs_l=img.3..0l10.12132.12132.0.12480.1.1.0.0.0.0.69.69.1.1.0....0...1c.2.64.img..0.1.68....0.SBCw47yHafo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=gNG9W5D9CtDgkgWpor3ADg&q=Lebanon&oq=Lebanon&gs_l=img.3..0l10.12864.12864.0.13257.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.KOl1EYHiwLc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=jtG9W5yTC4OwkwW4v4bICQ&q=Lesotho&oq=Lesotho&gs_l=img.3..0j0i67k1j0l8.14304.14304.0.14591.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.63....0.Yqtn-a0OMhc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ndG9W5nSJYHTsAf8o7yQAw&q=Liberia&oq=Liberia&gs_l=img.3..0i67k1j0l2j0i67k1j0l6.124915.124915.0.125237.1.1.0.0.0.0.104.104.0j1.1.0....0...1c.2.64.img..0.1.104....0.UQuUQPIiEug",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=G9K9W6bXJ6jisAeSvp64CQ&q=Libya&oq=Libya&gs_l=img.3..0i67k1j0j0i67k1j0l7.12470.12470.0.12728.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.63....0.cLmQ8Fix1jE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=KdK9W5vEDcy8kwXH0IuQDw&q=Liechtenstein&oq=Liechtenstein&gs_l=img.3..0l10.15246.15246.0.15543.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.p1Zl1jbOE30",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=OdK9W_SHHsrikgWS5r2IDg&q=Lithuania&oq=Lithuania&gs_l=img.3..0i67k1j0l9.12364.12364.0.12717.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.YZAJ3ZeHWeE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=RtK9W4-bN86WkwXAvquAAQ&q=Luxembourg&oq=Luxembourg&gs_l=img.3..0i67k1j0j0i67k1l3j0l5.12132.12132.0.12463.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.64....0.y5BHZeleN3o",

        // M
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=VNK9W6ClHYHzkwXcsqPgDA&q=Macedonia&oq=Macedonia&gs_l=img.3..0i67k1l2j0l8.44505.44505.0.44994.1.1.0.0.0.0.82.82.1.1.0....0...1c.2.64.img..0.1.82....0.v5Db8IOBjYg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=gtK9W8iPFsqYkwW58ai4CA&q=Madagascar&oq=Madagascar&gs_l=img.3..0i67k1j0j0i67k1l2j0l6.11899.11899.0.12253.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.X9DS8S0ecSE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=j9K9W7DdHsj1kwWEy62oAQ&q=Malawi&oq=Malawi&gs_l=img.3..0i67k1l2j0l2j0i67k1j0l2j0i67k1j0j0i67k1.12142.12142.0.12440.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.STtR7-N0ao0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=qtK9W_rZN5C8kwWq4r7YBg&q=Malaysia&oq=Malaysia&gs_l=img.3...0.0.0.11868.0.0.0.0.0.0.0.0..0.0....0...1c..64.img..0.0.0....0.Ns0L4Wy9LvI",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=t9K9W8HvMsb3kwX6s7KACA&q=Maldives&oq=Maldives&gs_l=img.3..0i67k1j0j0i67k1l4j0l3j0i67k1.191740.191740.0.192862.1.1.0.0.0.0.82.82.1.1.0....0...1c.2.64.img..0.1.82....0.qZ6CqXJyiSo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=edO9W4mCFMrWkwXA4b-4BA&q=Mali&oq=Mali&gs_l=img.3..0i67k1l2j0j0i67k1l3j0l4.14920.14920.0.15250.1.1.0.0.0.0.79.79.1.1.0....0...1c.2.64.img..0.1.77....0.JyPEfZeGgsg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=idO9W6a9F4P1kwXJ0bP4Dg&q=Malta&oq=Malta&gs_l=img.3..0j0i67k1j0l8.13125.13125.0.13424.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.66....0.Sz86QvyakSk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=l9O9W5S5J4yUsAfysLDgCw&q=Marshall+Islands&oq=Marshall+Islands&gs_l=img.3..0l10.55757.55757.0.56526.1.1.0.0.0.0.105.105.0j1.1.0....0...1c.2.64.img..0.1.104....0.Qbu2rbRIA1Q",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=0dO9W4bFBsvosAeK7aso&q=Mauritania&oq=Mauritania&gs_l=img.3..0l10.40903.40903.0.41209.1.1.0.0.0.0.106.106.0j1.1.0....0...1c.2.64.img..0.1.106....0.pdrLGCf2Xv8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=-9O9W5DJBYW6kwWNmYfQDA&q=Mauritius&oq=Mauritius&gs_l=img.3..0l8j0i67k1j0.12643.12643.0.13030.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.61....0.zM9IYIa24u0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=CNS9W4n3OIaxkwWciYvoDA&q=Mexico&oq=Mexico&gs_l=img.3..0l4j0i67k1j0l5.16332.16332.0.16701.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.62....0.9g-NL8I7qXU",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=GtS9W478IMadkgWyz6TYCA&q=Micronesia&oq=Micronesia&gs_l=img.3..0l10.15456.15456.0.15968.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.flqm9VDYKT0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=K9S9W8G7GYSykwWn1oOwAg&q=Moldova&oq=Moldova&gs_l=img.3..0l10.15568.15568.0.16076.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.61....0.pm6wHhk474g",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=PNS9W4qhFcrXkwWBuI6IDQ&q=Monaco&oq=Monaco&gs_l=img.3..0i67k1l5j0l5.14820.14820.0.15164.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.6ucjxZotChg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=TNS9W--nEoy5kwWf9Y_gCg&q=Mongolia&oq=Mongolia&gs_l=img.3..0i67k1j0l3j0i67k1j0l5.12042.12042.0.12388.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.9gFrna5bhKM",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=WdS9W4KHHYH0kwWj8K-ADA&q=Montenegro&oq=Montenegro&gs_l=img.3..0l10.11413.11413.0.11781.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.61....0.5DoYmArhtuk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ZtS9W_LQBYj6sAeX_7HgBQ&q=Morocco&oq=Morocco&gs_l=img.3..0i67k1l2j0l2j0i67k1j0l5.11502.11502.0.11896.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.yScphi8lEuc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ctS9W9SHNYHlkgX3sZ3wCQ&q=Mozambique&oq=Mozambique&gs_l=img.3..0i67k1j0l2j0i67k1l2j0l5.11718.11718.0.12047.1.1.0.0.0.0.78.78.1.1.0....0...1c.2.64.img..0.1.78....0.D3-kgoljGR4",

        // N
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=f9S9W_2HOYT0kwWFyJGgBA&q=Namibia&oq=Namibia&gs_l=img.3..0i67k1l2j0j0i67k1j0j0i67k1l2j0l3.16434.16434.0.16842.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.61....0.D37hwAB_qTg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=kdS9W8rQK86xkwXMp5GADQ&q=Nauru&oq=Nauru&gs_l=img.3..0l10.25652.25652.0.25973.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.8SGk3ijF6v0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=rNS9W-PAI8WSkwWt5YWwBg&q=Nepal&oq=Nepal&gs_l=img.3..0i67k1l2j0l8.30573.30573.0.31062.1.1.0.0.0.0.102.102.0j1.1.0....0...1c.2.64.img..0.1.102....0.IFLXLDlaVnU",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=zNS9W5-uIomxkwXZ_KiwBQ&q=New+Zealand&oq=New+Zealand&gs_l=img.3..0i67k1l2j0l4j0i67k1j0l3.12793.12793.0.13202.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.61....0.lgidGx3Kaps",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=2tS9W6LCIsOdkgW6mb2YCw&q=Nicaragua&oq=Nicaragua&gs_l=img.3..0i67k1j0j0i67k1j0j0i67k1l2j0l2j0i67k1j0.11561.11561.0.11841.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.lHTxzIG1Cgg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=59S9W5uOCtD1kwWLxJCADw&q=Niger&oq=Niger&gs_l=img.3..0i67k1l2j0l3j0i67k1j0l4.11266.11266.0.11619.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.74....0.UIQaOP5t_9s",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=89S9W8jALYu8kwXv5I34Cg&q=Nigeria&oq=Nigeria&gs_l=img.3..0i67k1j0l9.12346.12346.0.12587.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.66....0.22lH_9flE8w",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=AdW9W5SoD9DhkgXBubq4BQ&q=Norway&oq=Norway&gs_l=img.3..0i67k1l3j0l7.12075.12075.0.12276.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.60....0.GcYn6DkoQKA",

        // O
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Hda9W4WoCIG0sAehsJaQDg&q=oman&oq=oman&gs_l=img.3..0i67k1j0l9.24414.24852.0.25140.4.4.0.0.0.0.76.259.4.4.0....0...1c.1.64.img..0.4.257...35i39k1.0.9kYtj18NNAg",

        // P
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=N9a9W_myBs-4kwXb5674BA&q=+Pakistan&oq=+Pakistan&gs_l=img.3..0i67k1l3j0j0i67k1l3j0l3.37683.37683.0.37986.1.1.0.0.0.0.101.101.0j1.1.0....0...1c.2.64.img..0.1.99....0.dQTETh32Uv0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Xda9W4nFMcXSkwXr47jwCA&q=Palau&oq=Palau&gs_l=img.3..0j0i67k1j0l2j0i67k1j0l5.18527.18527.0.18903.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.pIUWpFyEbEo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=cda9W9ifMYHlkgX3sZ3wCQ&q=Palestine&oq=Palestine&gs_l=img.3..0l10.14324.14324.0.14677.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.64....0.eSqDRk8p2ww",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=gda9W5ukGNKdkgXq6ovICA&q=Panama&oq=Panama&gs_l=img.3..0l10.13603.13603.0.13956.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.64....0.XJT9KeOZx2o",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=kNa9W6jKDoOTkwXFvpPICw&q=Papua+New+Guinea&oq=Papua+New+Guinea&gs_l=img.3..0j0i67k1l2j0l7.14284.14284.0.14542.1.1.0.0.0.0.61.61.1.1.0....0...1c.2.64.img..0.1.60....0.zqCnJKOx79w",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=n9a9W7vZKsOUsAeflIaoDA&q=Paraguay&oq=Paraguay&gs_l=img.3..0j0i67k1l2j0l7.11647.11647.0.11831.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.62....0.sSxWPfeUaHQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=rNa9W6eQGYvSsAfKiaf4Dw&q=Peru&oq=Peru&gs_l=img.3..0i67k1j0l2j0i67k1j0l6.14660.14660.0.15045.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.66....0.JSJ70o29SJA",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=vNa9W7uMIcyYsAfX3rewAg&q=Philippines&oq=Philippines&gs_l=img.3..0i67k1j0l2j0i67k1j0l6.12904.12904.0.13241.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.x0iBM_8XtpM",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=yta9W-WZKMW2kwXA7LiQCA&q=Poland&oq=Poland&gs_l=img.3..0i67k1l3j0j0i67k1j0l5.12820.12820.0.13181.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.yxmExvKSA1U",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=2Na9W62JJ4X6kwXjnJeQBw&q=Portugal+&oq=Portugal+&gs_l=img.3..0i67k1l2j0j0i67k1l2j0l5.11522.11522.0.11844.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.64....0.PZ4N8oJPTo4",

        // Q
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=5da9W9O-FYHUkwWPnJmYCA&q=Qatar&oq=Qatar&gs_l=img.3..0i67k1l2j0l8.35376.35376.0.35680.1.1.0.0.0.0.103.103.0j1.1.0....0...1c.2.64.img..0.1.102....0.REKfE__nyUM",

        // R
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Cde9W9HjNoPUkwXIsbOgAw&q=Romania&oq=Romania&gs_l=img.3..0l10.32080.32080.0.32474.1.1.0.0.0.0.135.135.0j1.1.0....0...1c.2.64.img..0.1.135....0.WQS1lYlEANQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=K9e9W-SVDtGdkgWutJyYCw&q=Russia+&oq=Russia+&gs_l=img.3..0l2j0i67k1l3j0l5.12586.12586.0.12870.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.h_m14E6gX50",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ONe9W8PtNoqbkwXhvIWIDQ&q=Rwanda&oq=Rwanda&gs_l=img.3..0l2j0i67k1j0l7.45874.45874.0.46273.1.1.0.0.0.0.74.74.1.1.0....0...1c.2.64.img..0.1.73....0.nn_0SrLVoCc",

        // S
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=aNe9W_jmB6zkkgWG_Y_ADw&q=Sahara%2C+Western&oq=Sahara%2C+Western&gs_l=img.3..0i8i30k1l10.23553.23553.0.23824.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.AwHFMSM36a0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=gNe9W9aXOMmasAfe5prQBg&q=Saint+Kitts+and+Nevis&oq=Saint+Kitts+and+Nevis&gs_l=img.3..0l10.19418.19418.0.19643.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.ajTnukKMA9U",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=lde9W8abG8mbsAfLsr4Q&q=Saint+Lucia&oq=Saint+Lucia&gs_l=img.3..0l10.62020.62020.0.62310.1.1.0.0.0.0.83.83.1.1.0....0...1c.2.64.img..0.1.83....0.1iH9pQSbGL8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=1Ne9W5W1MYGzkwWsn7OgBQ&q=Saint+Vincent+and+the+Grenadines&oq=Saint+Vincent+and+the+Grenadines&gs_l=img.3..0l10.15152.15152.0.15432.1.1.0.0.0.0.74.74.1.1.0....0...1c.2.64.img..0.1.73....0.OglZBFRsZfk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=5de9W8qXFcGTsAfh6o3YCQ&q=Samoa&oq=Samoa&gs_l=img.3..0i67k1j0j0i67k1l2j0l6.11159.11159.0.11448.1.1.0.0.0.0.75.75.1.1.0....0...1c.2.64.img..0.1.75....0.AuLMoyFPzHE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=8de9W9zjNcu5kwXs14OoAw&q=San+Marino&oq=San+Marino&gs_l=img.3..0j0i67k1l2j0l7.12840.12840.0.13177.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.67....0.8-ihGmlwuLQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=_9e9W_OBNqvhkgWX5YTQBA&q=S%C3%A3o+Tom%C3%A9+and+Pr%C3%ADncipe&oq=S%C3%A3o+Tom%C3%A9+and+Pr%C3%ADncipe&gs_l=img.3..0l9j0i7i30k1.13454.16204.0.16420.3.3.0.0.0.0.68.177.3.3.0....0...1c.1j2.64.img..0.2.129...0i24k1.0.at-3nZ-rUXY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Edi9W7CgEa_nsAfpvpqICw&q=Saudi+Arabia&oq=Saudi+Arabia&gs_l=img.3..0l10.160739.160739.0.161846.1.1.0.0.0.0.125.125.0j1.1.0....0...1c.2.64.img..0.1.124....0.OjvKGrRcHvQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=tNi9W5XUBZKykwWTkqbYBw&q=Senegal&oq=Senegal&gs_l=img.3..0i67k1l2j0l8.16716.16716.0.17206.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.aqilJ0U9xTY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=xti9W_iHBoLkkgWh96OwBg&q=Serbia&oq=Serbia&gs_l=img.3..0i67k1l3j0l7.10903.10903.0.11193.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.kmPWihw7_w4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=0ti9W_SaDs61kwXxxaXoAg&q=Seychelles&oq=Seychelles&gs_l=img.3..0l10.1126645.1126645.0.1126956.1.1.0.0.0.0.110.110.0j1.1.0....0...1c.2.64.img..0.1.109....0.lcbMrmNmZLo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Ot29W7DYAse0kwW0_bo4&q=Sierra+Leone&oq=Sierra+Leone&gs_l=img.3..0l10.16716.16716.0.16980.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.61....0.PAaL0FJNsYA",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=S929W56XNYf7kwXD96LYBg&q=Singapore&oq=Singapore&gs_l=img.3..0i67k1l2j0j0i67k1j0l6.18264.18264.0.18785.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.67....0.wI-NC0jPdWQ",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=X929W4SRH4z2kwXZl4GgBg&q=Slovakia&oq=Slovakia&gs_l=img.3..0j0i67k1j0l8.12632.12632.0.12953.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.PNLxYR2rpvw",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=bd29W-vhFqXlkgWEwqKIAg&q=Slovenia&oq=Slovenia&gs_l=img.3..0i67k1j0l2j0i67k1j0l3j0i67k1j0l2.12678.12678.0.12968.1.1.0.0.0.0.69.69.1.1.0....0...1c.2.64.img..0.1.69....0.A3f5G-Veu5w",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=e929W-TCB7-Bi-gP0vGuwAg&q=Solomon+Islands&oq=Solomon+Islands&gs_l=img.3..0l10.12265.12265.0.12593.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.66....0.Im7m_pyal4U",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=iN29W4LKGYXpsAfFjYzgDw&q=Somalia+&oq=Somalia+&gs_l=img.3..0i67k1j0l9.26204.26204.0.27418.1.1.0.0.0.0.73.73.1.1.0....0...1c.2.64.img..0.1.73....0.PAVPA-GibZk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=pN29W9PSLc7SkgWuuIGgCA&q=Somaliland&oq=Somaliland&gs_l=img.3..0l10.17778.17778.0.18052.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.63....0.H2Qm17g_OD4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=t929W--yKYnSsAevpbiQAQ&q=South+Africa&oq=South+Africa&gs_l=img.3..0l10.80905.80905.0.81266.1.1.0.0.0.0.105.105.0j1.1.0....0...1c.2.64.img..0.1.104....0.lg8HDtsEVAE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Cd69W4-5K8ewkwXV4bK4AQ&q=South+Ossetia&oq=South+Ossetia&gs_l=img.3..0l10.12056.12056.0.12315.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.lbWBq0UBYrg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=F969W5GeBcaXkwWQ7bPwAQ&q=South+Sudan&oq=South+Sudan&gs_l=img.3..0l10.11474.11474.0.11876.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.mIawoN9xAw4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=I969W_f8NIrlkgXbraHQCw&q=Spain&oq=Spain&gs_l=img.3..0i67k1l5j0l3j0i67k1l2.14596.14596.0.14885.1.1.0.0.0.0.69.69.1.1.0....0...1c.2.64.img..0.1.68....0.mB0_FD3mvSE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=M969W52YKci3kwXB-pb4Cw&q=Sri+Lanka&oq=Sri+Lanka&gs_l=img.3..0i67k1l3j0j0i67k1j0l5.11862.11862.0.12208.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.izHRWIT5rHE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=QN69W9DSMIH5kwWFpb-ICw&q=Sudan&oq=Sudan&gs_l=img.3..0i67k1j0j0i67k1j0l5j0i67k1l2.13965.13965.0.14272.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.67....0.8pY59Z0xVqg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=T969W7bANsf7kwWhz5PQCA&q=Suriname&oq=Suriname&gs_l=img.3..0l10.13502.13502.0.13847.1.1.0.0.0.0.66.66.1.1.0....0...1c.2.64.img..0.1.65....0.GAWX8a4aetA",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=Xt69W7KSJ42SkwWQvp_ABw&q=+Swaziland&oq=+Swaziland&gs_l=img.3..0l10.11219.11219.0.11532.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.v4sp97iOf1w",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=a969W4brDIT3kwXswKroBg&q=Sweden&oq=Sweden&gs_l=img.3..0l10.45075.45075.0.45461.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.67....0.ccBWajuQVeA",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=qt69W5n-KpC8kwWq4r7YBg&q=Switzerland&oq=Switzerland&gs_l=img.3...0.0.0.418234.0.0.0.0.0.0.0.0..0.0....0...1c..64.img..0.0.0....0.ZSIqlW_DlpE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=TeC9W_iXNoGYsAeciK-wDA&q=Syria&oq=Syria&gs_l=img.3..0i67k1j0j0i67k1j0l7.14394.14394.0.14842.1.1.0.0.0.0.70.70.1.1.0....0...1c.2.64.img..0.1.69....0.6ObxA4NCrv0",

        // T
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=XeC9W4fTGcHlkwXeso6ABA&q=Taiwan&oq=Taiwan&gs_l=img.3..0i67k1l3j0l7.20204.20204.0.20429.1.1.0.0.0.0.77.77.1.1.0....0...1c.2.64.img..0.1.76....0.qngr_AbF1Y0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=cuC9W4zPMcz4kwWv-Y_ICw&q=Tajikistan&oq=Tajikistan&gs_l=img.3..0j0i67k1j0l8.17086.17086.0.17414.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.63....0.ep_4ur3yrgo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=heC9W8TNC4vmsAfA5qeACw&q=Tanzania&oq=Tanzania&gs_l=img.3..0l10.11292.11292.0.11822.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.s96VONYtw_0",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=neC9W8mbC46dsAf4mK64Dg&q=Thailand&oq=Thailand&gs_l=img.3...0.0.0.70431.0.0.0.0.0.0.0.0..0.0....0...1c..64.img..0.0.0....0.cvcI2y60FpE",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=5OC9W-rhG4TUsAfrkZKQBw&q=Timor-Leste&oq=Timor-Leste&gs_l=img.3..0l10.14669.14669.0.14927.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.64....0.WGRbgo9Vz4o",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=9OC9W-i_A6fmsAeAxrLoBA&q=Togo+&oq=Togo+&gs_l=img.3..0l10.12754.12754.0.13084.1.1.0.0.0.0.64.64.1.1.0....0...1c.2.64.img..0.1.63....0.h2jg6ycR7rg",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=AuG9W6KIB5LlkgWc9o2QDA&q=Tonga+&oq=Tonga+&gs_l=img.3..0l10.10458.10458.0.10755.1.1.0.0.0.0.60.60.1.1.0....0...1c.2.64.img..0.1.60....0._50VEFDm6J8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=DeG9W_faMMnUkwWt1J3oAQ&q=Transnistria&oq=Transnistria&gs_l=img.3..0l10.33580.33580.0.33973.1.1.0.0.0.0.89.89.1.1.0....0...1c.2.64.img..0.1.89....0.yTCjc_b8QCI",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=MOG9W_L5Js_lkgWp9aDICQ&q=Trinidad+and+Tobago+&oq=Trinidad+and+Tobago+&gs_l=img.3..0l10.15433.15433.0.15723.1.1.0.0.0.0.60.60.1.1.0....0...1c.2.64.img..0.1.60....0.N525P-XO9nw",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=QeG9W-SpEIHSkgXdjryQDw&q=Tunisia+&oq=Tunisia+&gs_l=img.3..0l10.13547.13547.0.13843.1.1.0.0.0.0.65.65.1.1.0....0...1c.2.64.img..0.1.64....0.Kgen8RWEWI4",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=XOG9W_bkMbLjkgWisrToDw&q=Turkey+country&oq=Turkey+country&gs_l=img.3..0l2j0i67k1j0l7.2944.3966.0.4100.8.4.0.4.4.0.57.205.4.4.0....0...1c.1.64.img..0.8.212....0.c6bIBw7Gnyc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=YeG9W-SOLIyWsAeBp4-ADQ&q=Turkmenistan&oq=Turkmenistan&gs_l=img.3..0j0i67k1l4j0l5.12145.12145.0.12475.1.1.0.0.0.0.55.55.1.1.0....0...1c.2.64.img..0.1.54....0._VWpaGV-Aqk",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=buG9W8zrOovhkgXa0oi4Bw&q=Tuvalu&oq=Tuvalu&gs_l=img.3..0l10.11288.11288.0.11584.1.1.0.0.0.0.62.62.1.1.0....0...1c.2.64.img..0.1.62....0.vCbC0tApEHo",

        // U
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=e-G9W43LGI_UsAej6qaADA&q=Uganda&oq=Uganda&gs_l=img.3..0l3j0i67k1j0l6.12651.12651.0.13146.1.1.0.0.0.0.59.59.1.1.0....0...1c.2.64.img..0.1.58....0.mB56xYXxLNs",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=o-G9W5KLJoe4kwXbyYTgAg&q=Ukraine&oq=Ukraine&gs_l=img.3...0.0.0.312821.0.0.0.0.0.0.0.0..0.0....0...1c..64.img..0.0.0....0.uGcemMp9-l8",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=3eK9W_27ILHjsAfH5IIw&q=United+Arab+Emirates&oq=United+Arab+Emirates&gs_l=img.3..0l10.14705.14705.0.14994.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.WsImQ0FOsZA",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=7eK9W6rvI8aasAexvLzQBg&q=United+Kingdom+&oq=United+Kingdom+&gs_l=img.3..0l10.11012.11012.0.11389.1.1.0.0.0.0.71.71.1.1.0....0...1c.2.64.img..0.1.70....0.8iwJkNYiQAI",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=-eK9W4rULcHasAeAr7WQDQ&q=United+States&oq=United+States&gs_l=img.3..0l10.10589.10589.0.10919.1.1.0.0.0.0.70.70.1.1.0....0...1c.2.64.img..0.1.69....0.qgK6WOEyuMA",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=BeO9W9nCHM7xkwWB34joAQ&q=Uruguay&oq=Uruguay&gs_l=img.3..0j0i67k1l3j0l6.89205.89205.0.89541.1.1.0.0.0.0.96.96.1.1.0....0...1c.2.64.img..0.1.95....0.FVis9Fz-NLc",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=X-O9W6LRMcGUsAe-qKeADQ&q=Uzbekistan+&oq=Uzbekistan+&gs_l=img.3..0l10.20503.20503.0.20894.1.1.0.0.0.0.67.67.1.1.0....0...1c.2.64.img..0.1.66....0.pd2bIvPnxY8",

        // V
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=deO9W9y3JMOZsAeKz62wBw&q=Vanuatu+&oq=Vanuatu+&gs_l=img.3..0l10.13036.13036.0.13535.1.1.0.0.0.0.60.60.1.1.0....0...1c.2.64.img..0.1.59....0._pPY73J989g",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=g-O9W4OmN4XisAfd_qHYDg&q=Vatican+City&oq=Vatican+City&gs_l=img.3..0l10.66475.66475.0.66860.1.1.0.0.0.0.98.98.1.1.0....0...1c.2.64.img..0.1.98....0.IHrf9hH53xo",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=x-O9W-HUI4fTkgWvp7ngCw&q=+Venezuela&oq=+Venezuela&gs_l=img.3..35i39k1j0i67k1j0l2j0i67k1j0j0i67k1j0j0i67k1j0.15315.15315.0.15748.1.1.0.0.0.0.79.79.1.1.0....0...1c.2.64.img..0.1.78....0.VCD0s-jStrY",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=2OO9W9i1CbLisAfJy6LIDg&q=Vietnam&oq=Vietnam&gs_l=img.3..0i67k1j0j0i67k1j0l4j0i67k1j0l2.12401.12401.0.12921.1.1.0.0.0.0.70.70.1.1.0....0...1c.2.64.img..0.1.69....0.IfLkRwakB60",

        // Y
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=5eO9W_eDN8iwkwXUpozwDA&q=Yemen+&oq=Yemen+&gs_l=img.3..0l5j0i10k1j0l4.126485.126485.0.126804.1.1.0.0.0.0.140.140.0j1.1.0....0...1c.2.64.img..0.1.139....0.9a9m5J7pxq4",

        // Z
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=ZeS9W63oHI3msAeQzJDYDg&q=Zambia+&oq=Zambia+&gs_l=img.3..0l10.17954.17954.0.18258.1.1.0.0.0.0.63.63.1.1.0....0...1c.2.64.img..0.1.62....0.UPzee8lmN3E",
        "www.google.co.uk/search?biw=1280&bih=662&tbm=isch&sa=1&ei=eOS9W5-aIqzjkgWBiLuYCg&q=Zimbabwe+&oq=Zimbabwe+&gs_l=img.3..0i67k1l8j0l2.14922.14922.0.15337.1.1.0.0.0.0.68.68.1.1.0....0...1c.2.64.img..0.1.68....0.O77EqHHVtxc"

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
