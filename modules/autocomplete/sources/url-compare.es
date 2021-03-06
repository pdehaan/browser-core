/*
 * This module handles results(url) comparison
 *
 */


// TLD list extracted from http://www.iana.org/domains/root/db,
// cc stands fro country code, the other are generic
var TLDs = {gw: 'cc', gu: 'cc', gt: 'cc', gs: 'cc', gr: 'cc', gq: 'cc', gp: 'cc', dance: 'na', tienda: 'na', gy: 'cc', gg: 'cc', gf: 'cc', ge: 'cc', gd: 'cc', gb: 'cc', ga: 'cc', edu: 'na', gn: 'cc', gm: 'cc', gl: 'cc', '\u516c\u53f8': 'na', gi: 'cc', gh: 'cc', tz: 'cc', zone: 'na', tv: 'cc', tw: 'cc', tt: 'cc', immobilien: 'na', tr: 'cc', tp: 'cc', tn: 'cc', to: 'cc', tl: 'cc', bike: 'na', tj: 'cc', tk: 'cc', th: 'cc', tf: 'cc', tg: 'cc', td: 'cc', tc: 'cc', coop: 'na', '\u043e\u043d\u043b\u0430\u0439\u043d': 'na', cool: 'na', ro: 'cc', vu: 'cc', democrat: 'na', guitars: 'na', qpon: 'na', '\u0441\u0440\u0431': 'cc', zm: 'cc', tel: 'na', futbol: 'na', za: 'cc', '\u0628\u0627\u0632\u0627\u0631': 'na', '\u0440\u0444': 'cc', zw: 'cc', blue: 'na', mu: 'cc', '\u0e44\u0e17\u0e22': 'cc', asia: 'na', marketing: 'na', '\u6d4b\u8bd5': 'na', international: 'na', net: 'na', '\u65b0\u52a0\u5761': 'cc', okinawa: 'na', '\u0baa\u0bb0\u0bbf\u0b9f\u0bcd\u0b9a\u0bc8': 'na', '\u05d8\u05e2\u05e1\u05d8': 'na', '\uc0bc\uc131': 'na', sexy: 'na', institute: 'na', '\u53f0\u7063': 'cc', pics: 'na', '\u516c\u76ca': 'na', '\u673a\u6784': 'na', social: 'na', domains: 'na', '\u9999\u6e2f': 'cc', '\u96c6\u56e2': 'na', limo: 'na', '\u043c\u043e\u043d': 'cc', tools: 'na', nagoya: 'na', properties: 'na', camera: 'na', today: 'na', club: 'na', company: 'na', glass: 'na', berlin: 'na', me: 'cc', md: 'cc', mg: 'cc', mf: 'cc', ma: 'cc', mc: 'cc', tokyo: 'na', mm: 'cc', ml: 'cc', mo: 'cc', mn: 'cc', mh: 'cc', mk: 'cc', cat: 'na', reviews: 'na', mt: 'cc', mw: 'cc', mv: 'cc', mq: 'cc', mp: 'cc', ms: 'cc', mr: 'cc', cab: 'na', my: 'cc', mx: 'cc', mz: 'cc', '\u0b87\u0bb2\u0b99\u0bcd\u0b95\u0bc8': 'cc', wang: 'na', estate: 'na', clothing: 'na', monash: 'na', guru: 'na', technology: 'na', travel: 'na', '\u30c6\u30b9\u30c8': 'na', pink: 'na', fr: 'cc', '\ud14c\uc2a4\ud2b8': 'na', farm: 'na', lighting: 'na', fi: 'cc', fj: 'cc', fk: 'cc', fm: 'cc', fo: 'cc', sz: 'cc', kaufen: 'na', sx: 'cc', ss: 'cc', sr: 'cc', sv: 'cc', su: 'cc', st: 'cc', sk: 'cc', sj: 'cc', si: 'cc', sh: 'cc', so: 'cc', sn: 'cc', sm: 'cc', sl: 'cc', sc: 'cc', sb: 'cc', rentals: 'na', sg: 'cc', se: 'cc', sd: 'cc', '\u7ec4\u7ec7\u673a\u6784': 'na', shoes: 'na', '\u4e2d\u570b': 'cc', industries: 'na', lb: 'cc', lc: 'cc', la: 'cc', lk: 'cc', li: 'cc', lv: 'cc', lt: 'cc', lu: 'cc', lr: 'cc', ls: 'cc', holiday: 'na', ly: 'cc', coffee: 'na', ceo: 'na', '\u5728\u7ebf': 'na', ye: 'cc', '\u0625\u062e\u062a\u0628\u0627\u0631': 'na', ninja: 'na', yt: 'cc', name: 'na', moda: 'na', eh: 'cc', '\u0628\u06be\u0627\u0631\u062a': 'cc', ee: 'cc', house: 'na', eg: 'cc', ec: 'cc', vote: 'na', eu: 'cc', et: 'cc', es: 'cc', er: 'cc', ru: 'cc', rw: 'cc', '\u0aad\u0abe\u0ab0\u0aa4': 'cc', rs: 'cc', boutique: 'na', re: 'cc', '\u0633\u0648\u0631\u064a\u0629': 'cc', gov: 'na', '\u043e\u0440\u0433': 'na', red: 'na', foundation: 'na', pub: 'na', vacations: 'na', org: 'na', training: 'na', recipes: 'na', '\u0438\u0441\u043f\u044b\u0442\u0430\u043d\u0438\u0435': 'na', '\u4e2d\u6587\u7f51': 'na', support: 'na', onl: 'na', '\u4e2d\u4fe1': 'na', voto: 'na', florist: 'na', '\u0dbd\u0d82\u0d9a\u0dcf': 'cc', '\u049b\u0430\u0437': 'cc', management: 'na', '\u0645\u0635\u0631': 'cc', '\u0622\u0632\u0645\u0627\u06cc\u0634\u06cc': 'na', kiwi: 'na', academy: 'na', sy: 'cc', cards: 'na', '\u0938\u0902\u0917\u0920\u0928': 'na', pro: 'na', kred: 'na', sa: 'cc', mil: 'na', '\u6211\u7231\u4f60': 'na', agency: 'na', '\u307f\u3093\u306a': 'na', equipment: 'na', mango: 'na', luxury: 'na', villas: 'na', '\u653f\u52a1': 'na', singles: 'na', systems: 'na', plumbing: 'na', '\u03b4\u03bf\u03ba\u03b9\u03bc\u03ae': 'na', '\u062a\u0648\u0646\u0633': 'cc', '\u067e\u0627\u06a9\u0633\u062a\u0627\u0646': 'cc', gallery: 'na', kg: 'cc', ke: 'cc', '\u09ac\u09be\u0982\u09b2\u09be': 'cc', ki: 'cc', kh: 'cc', kn: 'cc', km: 'cc', kr: 'cc', kp: 'cc', kw: 'cc', link: 'na', ky: 'cc', voting: 'na', cruises: 'na', '\u0639\u0645\u0627\u0646': 'cc', cheap: 'na', solutions: 'na', '\u6e2c\u8a66': 'na', neustar: 'na', partners: 'na', '\u0b87\u0ba8\u0bcd\u0ba4\u0bbf\u0baf\u0bbe': 'cc', menu: 'na', arpa: 'na', flights: 'na', rich: 'na', do: 'cc', dm: 'cc', dj: 'cc', dk: 'cc', photography: 'na', de: 'cc', watch: 'na', dz: 'cc', supplies: 'na', report: 'na', tips: 'na', '\u10d2\u10d4': 'cc', bar: 'na', qa: 'cc', shiksha: 'na', '\u0443\u043a\u0440': 'cc', vision: 'na', wiki: 'na', '\u0642\u0637\u0631': 'cc', '\ud55c\uad6d': 'cc', computer: 'na', best: 'na', voyage: 'na', expert: 'na', diamonds: 'na', email: 'na', wf: 'cc', jobs: 'na', bargains: 'na', '\u79fb\u52a8': 'na', jp: 'cc', jm: 'cc', jo: 'cc', ws: 'cc', je: 'cc', kitchen: 'na', '\u0a2d\u0a3e\u0a30\u0a24': 'cc', '\u0627\u06cc\u0631\u0627\u0646': 'cc', ua: 'cc', buzz: 'na', com: 'na', uno: 'na', ck: 'cc', ci: 'cc', ch: 'cc', co: 'cc', cn: 'cc', cm: 'cc', cl: 'cc', cc: 'cc', ca: 'cc', cg: 'cc', cf: 'cc', community: 'na', cd: 'cc', cz: 'cc', cy: 'cc', cx: 'cc', cr: 'cc', cw: 'cc', cv: 'cc', cu: 'cc', pr: 'cc', ps: 'cc', pw: 'cc', pt: 'cc', holdings: 'na', wien: 'na', py: 'cc', ai: 'cc', pa: 'cc', pf: 'cc', pg: 'cc', pe: 'cc', pk: 'cc', ph: 'cc', pn: 'cc', pl: 'cc', pm: 'cc', '\u53f0\u6e7e': 'cc', aero: 'na', catering: 'na', photos: 'na', '\u092a\u0930\u0940\u0915\u094d\u0937\u093e': 'na', graphics: 'na', '\u0641\u0644\u0633\u0637\u064a\u0646': 'cc', '\u09ad\u09be\u09b0\u09a4': 'cc', ventures: 'na', va: 'cc', vc: 'cc', ve: 'cc', vg: 'cc', iq: 'cc', vi: 'cc', is: 'cc', ir: 'cc', it: 'cc', vn: 'cc', im: 'cc', il: 'cc', io: 'cc', in: 'cc', ie: 'cc', id: 'cc', tattoo: 'na', education: 'na', parts: 'na', events: 'na', '\u0c2d\u0c3e\u0c30\u0c24\u0c4d': 'cc', cleaning: 'na', kim: 'na', contractors: 'na', mobi: 'na', center: 'na', photo: 'na', nf: 'cc', '\u0645\u0644\u064a\u0633\u064a\u0627': 'cc', wed: 'na', supply: 'na', '\u7f51\u7edc': 'na', '\u0441\u0430\u0439\u0442': 'na', careers: 'na', build: 'na', '\u0627\u0644\u0627\u0631\u062f\u0646': 'cc', bid: 'na', biz: 'na', '\u0627\u0644\u0633\u0639\u0648\u062f\u064a\u0629': 'cc', gift: 'na', '\u0434\u0435\u0442\u0438': 'na', works: 'na', '\u6e38\u620f': 'na', tm: 'cc', exposed: 'na', productions: 'na', koeln: 'na', dating: 'na', christmas: 'na', bd: 'cc', be: 'cc', bf: 'cc', bg: 'cc', ba: 'cc', bb: 'cc', bl: 'cc', bm: 'cc', bn: 'cc', bo: 'cc', bh: 'cc', bi: 'cc', bj: 'cc', bt: 'cc', bv: 'cc', bw: 'cc', bq: 'cc', br: 'cc', bs: 'cc', post: 'na', by: 'cc', bz: 'cc', om: 'cc', ruhr: 'na', '\u0627\u0645\u0627\u0631\u0627\u062a': 'cc', repair: 'na', xyz: 'na', '\u0634\u0628\u0643\u0629': 'na', viajes: 'na', museum: 'na', fish: 'na', '\u0627\u0644\u062c\u0632\u0627\u0626\u0631': 'cc', hr: 'cc', ht: 'cc', hu: 'cc', hk: 'cc', construction: 'na', hn: 'cc', solar: 'na', hm: 'cc', info: 'na', '\u0b9a\u0bbf\u0b99\u0bcd\u0b95\u0baa\u0bcd\u0baa\u0bc2\u0bb0\u0bcd': 'cc', uy: 'cc', uz: 'cc', us: 'cc', um: 'cc', uk: 'cc', ug: 'cc', builders: 'na', ac: 'cc', camp: 'na', ae: 'cc', ad: 'cc', ag: 'cc', af: 'cc', int: 'na', am: 'cc', al: 'cc', ao: 'cc', an: 'cc', aq: 'cc', as: 'cc', ar: 'cc', au: 'cc', at: 'cc', aw: 'cc', ax: 'cc', az: 'cc', ni: 'cc', codes: 'na', nl: 'cc', no: 'cc', na: 'cc', nc: 'cc', ne: 'cc', actor: 'na', ng: 'cc', '\u092d\u093e\u0930\u0924': 'cc', nz: 'cc', '\u0633\u0648\u062f\u0627\u0646': 'cc', np: 'cc', nr: 'cc', nu: 'cc', xxx: 'na', '\u4e16\u754c': 'na', kz: 'cc', enterprises: 'na', land: 'na', '\u0627\u0644\u0645\u063a\u0631\u0628': 'cc', '\u4e2d\u56fd': 'cc', directory: 'na'};

var UrlCompare = {

  // Compare two URLs and return true if same or differing only by
  // country code in subdomain or path.
  sameUrls: function(url1, url2) {
      // Get generalized representation of each url
      var keys1 = UrlCompare._extractKeys(url1, '');
      var keys2 = UrlCompare._extractKeys(url2, '');

      // Compare the second one, which takes path into account
      return keys1[1] == keys2[1];
    },

  _filterTLDs: function(domain) {
    var v = domain.toLowerCase().split('.');

    // remove the first level yes or yes
    var first_level = TLDs[v[v.length - 1]];
    v[v.length - 1] = null;

    if ((v.length > 2) && (first_level == 'cc')) {
      // check if we also have to remove the second level, only if 3 or more
      //  levels and the first_level was a country code
      if (TLDs[v[v.length - 2]]) {
        v[v.length - 2] = null;
      }
    }

    // remove the nulls
    v = v.filter(function(n) { return n !== null; });

    // let's go to remove locales from the beginning, only if at least 2 or
    // more levels remaining and if the first_level was not a country code
    if ((v.length > 1) && (first_level != 'cc')) {

      // cover the case de.wikipedia.org
      if (TLDs[v[0]] == 'cc' || v[0] == 'en') {
        v[0] = null;
      }      else {
        // cover the case de-de.facebook.com
        var w = v[0].split('-');
        if ((w.length == 2) && (TLDs[w[0]] == 'cc' || w[0] == 'en') &&
            (TLDs[w[1]] == 'cc' || w[1] == 'en')) {
          v[0] = null;
        }
      }
    }

    // remove the nulls and join
    return v.filter(function(n) { return n !== null; }).join('.');
  },

  _filterTLDsInPath: function(path) {

    var v = path.toLowerCase().split('/');

    // it should have at least 2, "/".split('/') => ['', '']

    // we only consider the top level element in the path
    if (v.length > 1) {
      if (TLDs[v[1]] == 'cc') {
        v[1] = null;
      }      else {
        var w = v[1].split('-');
        if ((w.length == 2) && (TLDs[w[0]] == 'cc' || w[0] == 'en') && (TLDs[w[1]] == 'cc' || w[1] == 'en')) {
          v[1] = null;
        }
      }
    }

    // remove the nulls and join

    var clean_v = v.filter(function(n) { return n !== null; });

    var new_path = '/';

    if (clean_v.length > 1) {
      new_path = v.filter(function(n) { return n !== null; }).join('/');
    }    else {
      // special case when clean_v has only one element, it will not join the
      // initial slash
      new_path = '/' + v.filter(function(n) { return n !== null; }).join('/');
    }

    new_path = new_path.replace('//', '/');

    return new_path;

  },

  _extractKeys: function(url, title) {
    var clean_url =
      url.toLowerCase().replace(/^http[s]*:\/\//, '').replace(/^www\./, '');
    var v = clean_url.split('/');
    var domain = v[0];
    var path = '/';

    if (v.length > 1) {
      // remove the query string
      v[v.length - 1] = v[v.length - 1].split('?')[0];

      if (v[1] == '#') {
        // the path starts with # which is used for internal routing,
        // remove for keys
        // http://klout.com/#/solso == http://klout.com/solso
        if (v.length > 2) path = '/' + v.splice(2, v.length - 1).join('/');
      }      else path = '/' + v.splice(1, v.length - 1).join('/');
    }

    domain = UrlCompare._filterTLDs(domain);
    path = UrlCompare._filterTLDsInPath(path);

    // if no title or empty, generate a random key.
    // This is a fail-safe mechanism
    if ((title === undefined) || (title === null) || (title.trim() === '')) {
      title = '' + Math.random();
    }

    // remove debug info from title on the de-duplication, so that we have
    // consistent behaviour.
    // the debug info is anything that has ( foo bar )! end of line
    title = title.replace(/\(.*\)!$/, '').trim();

    return [domain, domain + path, domain + title];
  },
};

export default UrlCompare;
