for (
  var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    t = "",
    e = [256],
    n = [256],
    o = 0,
    a = function (r) {
      return r
        .replace(/[\u0080-\u07ff]/g, function (r) {
          var t = r.charCodeAt(0);
          return String.fromCharCode(192 | (t >> 6), 128 | (63 & t));
        })
        .replace(/[\u0800-\uffff]/g, function (r) {
          var t = r.charCodeAt(0);
          return String.fromCharCode(
            224 | (t >> 12),
            128 | ((t >> 6) & 63),
            128 | (63 & t),
          );
        });
    },
    u = function (r) {
      return r
        .replace(
          /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,
          function (r) {
            var t =
              ((15 & r.charCodeAt(0)) << 12) |
              ((63 & r.charCodeAt(1)) << 6) |
              (63 & r.charCodeAt(2));
            return String.fromCharCode(t);
          },
        )
        .replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function (r) {
          var t = ((31 & r.charCodeAt(0)) << 6) | (63 & r.charCodeAt(1));
          return String.fromCharCode(t);
        });
    };
  o < 256;

) {
  var c = String.fromCharCode(o);
  (t += c), (n[o] = o), (e[o] = r.indexOf(c)), ++o;
}
function f(r, t, e, n, o, a) {
  for (var u = 0, c = 0, f = (r = String(r)).length, i = "", d = 0; c < f; ) {
    var h = r.charCodeAt(c);
    for (u = (u << o) + (h = h < 256 ? e[h] : -1), d += o; d >= a; ) {
      var C = u >> (d -= a);
      (i += n.charAt(C)), (u ^= C << d);
    }
    ++c;
  }
  return !t && d > 0 && (i += n.charAt(u << (a - d))), i;
}
var i = function r(t, e, n) {
  return e ? r[t](e, n) : t ? null : this;
};
(i.btoa = i.encode =
  function (t, e) {
    return (
      (t = f(
        (t = !1 === i.raw || i.utf8encode || e ? a(t) : t),
        !1,
        n,
        r,
        8,
        6,
      )) + "====".slice(t.length % 4 || 4)
    );
  }),
  (i.atob = i.decode =
    function (r, n) {
      r = r.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var o = (r = String(r).split("=")).length;
      do {
        r[--o] = f(r[o], !0, e, t, 6, 8);
      } while (o > 0);
      return (r = r.join("")), !1 === i.raw || i.utf8decode || n ? u(r) : r;
    }),
  (module.exports = { btoa: i.btoa, atob: i.atob });
